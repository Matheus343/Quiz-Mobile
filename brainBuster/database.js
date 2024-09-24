import * as SQLite from 'expo-sqlite/next';

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('quiz.database');
    return cx;
}

export async function createTables() {
    const queryTemas = `CREATE TABLE IF NOT EXISTS temas
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )`;

    const queryPerguntas = `CREATE TABLE IF NOT EXISTS perguntas
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tema_id INTEGER,
            pergunta TEXT,
            alternativa1 TEXT,
            alternativa2 TEXT,
            alternativa3 TEXT,
            correta TEXT,
            FOREIGN KEY(tema_id) REFERENCES temas(id)
        )`;

    try {
        const cx = await getDbConnection();
        await cx.execAsync(queryTemas);
        await cx.execAsync(queryPerguntas);
        await cx.closeAsync();
    } catch (error) {
        console.error("Erro ao criar tabelas: ", error);
    }
}

export async function addTema(nome) {
    try {
        const cx = await getDbConnection();
        const queryTemas = 'INSERT INTO temas (nome) VALUES (?)';
        const result = await cx.runAsync(queryTemas, [nome]);
        await cx.closeAsync();
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao adicionar tema: ", error);
        return false;
    }
}

export async function getTemas() {
    try {
        const cx = await getDbConnection();
        const registros = await cx.getAllAsync('SELECT * FROM temas');
        await cx.closeAsync();
        return registros.map(registro => ({
            id: registro.id, 
            nome: registro.nome,
        }));
    } catch (error) {
        console.error("Erro ao buscar temas: ", error);
        return [];
    }
}

export async function countPerguntasByTema(tema_id) {
    try {
        const cx = await getDbConnection();
        const queryPerguntas = 'SELECT COUNT(*) as count FROM perguntas WHERE tema_id = ?';
        const result = await cx.getAllAsync(queryPerguntas, [tema_id]);
        return result[0]?.count || 0; 
    } catch (error) {
        console.error("Erro ao contar perguntas: ", error);
        return 0;
    }
}

export async function updateTema(id, nome) {
    try {
        const cx = await getDbConnection();
        const queryTemas = 'UPDATE temas SET nome = ? WHERE id = ?';
        const result = await cx.runAsync(queryTemas, [nome, id]);
        await cx.closeAsync();
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao atualizar tema: ", error);
        return false;
    }
}

export async function deleteTema(id) {
    try {
        const cx = await getDbConnection();
        const queryTemas = 'DELETE FROM temas WHERE id = ?';
        const result = await cx.runAsync(queryTemas, [id]);
        await cx.closeAsync();
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao excluir tema: ", error);
        return false;
    }
}

export async function updatePergunta(id, pergunta, alternativas, correta) {
    try {
        const cx = await getDbConnection();
        const queryPerguntas = `
            UPDATE perguntas 
            SET pergunta = ?, alternativa1 = ?, alternativa2 = ?, alternativa3 = ?, correta = ?
            WHERE id = ?`;
        const result = await cx.runAsync(queryPerguntas, [pergunta, alternativas[0], alternativas[1], alternativas[2], correta, id]);
        await cx.closeAsync();
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao atualizar pergunta: ", error);
        return false;
    }
}

export async function deletePergunta(id) {
    try {
        const cx = await getDbConnection();
        const queryPerguntas = 'DELETE FROM perguntas WHERE id = ?';
        const result = await cx.runAsync(queryPerguntas, [id]);
        await cx.closeAsync();
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao excluir pergunta: ", error);
        return false;
    }
}

export async function addPergunta({ tema_id, pergunta, alternativas, correta }) {
    if (!tema_id || !pergunta || alternativas.length < 3 || !correta) {
        throw new Error("Dados inválidos ao tentar adicionar a pergunta");
    }

    try {
        const cx = await getDbConnection();
        const queryPerguntas = `
            INSERT INTO perguntas (tema_id, pergunta, alternativa1, alternativa2, alternativa3, correta)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await cx.runAsync(queryPerguntas, [
            tema_id, 
            pergunta, 
            alternativas[0], 
            alternativas[1], 
            alternativas[2], 
            correta
        ]);
        return result.changes === 1;
    } catch (error) {
        console.error("Erro ao adicionar pergunta: ", error);
        return false;
    }
}
export async function getPerguntasByTema(tema_id) {
    try {
        const dbCx = await getDbConnection();
        const query = 'SELECT * FROM perguntas WHERE tema_id = ?';
        const result = await dbCx.getAllAsync(query, [tema_id]);
        await dbCx.closeAsync();
        return result;
    } catch (error) {
        console.error("Erro ao buscar perguntas por tema:", error);
        return [];
    }
}
