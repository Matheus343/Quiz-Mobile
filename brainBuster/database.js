import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS temas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
      );`
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS perguntas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tema_id INTEGER,
        pergunta TEXT,
        alternativa1 TEXT,
        alternativa2 TEXT,
        alternativa3 TEXT,
        alternativa4 TEXT,
        correta TEXT,
        FOREIGN KEY(tema_id) REFERENCES temas(id)
      );`
    );
  });
};

export const addTema = (nome, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO temas (nome) VALUES (?);',
      [nome],
      (_, result) => callback(result),
      (_, error) => console.log(error)
    );
  });
};

export const addPergunta = (tema_id, pergunta, alternativas, correta, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO perguntas (tema_id, pergunta, alternativa1, alternativa2, alternativa3, alternativa4, correta)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [tema_id, pergunta, alternativas[0], alternativas[1], alternativas[2], alternativas[3], correta],
      (_, result) => callback(result),
      (_, error) => console.log(error)
    );
  });
};

export const countPerguntasByTema = (tema_id, callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM perguntas WHERE tema_id = ?;',
        [tema_id],
        (_, { rows }) => callback(rows._array[0].count),  
        (_, error) => console.log(error)
      );
    });
  };
  
