import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { getTemas, addTema, updateTema, deleteTema, countPerguntasByTema } from './database';

export default function TelaCadTemas({ navigation }) {

  const [nomeTema, setNomeTema] = useState('');
  const [temas, setTemas] = useState([]);
  const [temaEditando, setTemaEditando] = useState(null);

  useEffect(() => {
    carregarTemas();
  }, []);

  const carregarTemas = async () => {
    try {
      const result = await getTemas();  // Função assíncrona
      const temasComPerguntas = await Promise.all(
        result.map(async (tema) => {
          const count = await countPerguntasByTema(tema.id);  // Outra função assíncrona
          return { ...tema, numPerguntas: count };
        })
      );
      setTemas(temasComPerguntas);
    } catch (error) {
      console.error("Erro ao carregar temas:", error);
    }
  };

  const validarNomeTema = (nome) => {
    const nomeValido = /^[a-zA-Z0-9\s]+$/;
    return nome.length > 1 && nomeValido.test(nome);
  };

  const cadastrarOuEditarTema = async () => {
    if (!validarNomeTema(nomeTema)) {
      Alert.alert('Erro', 'Por favor, insira um nome de tema válido.');
      return;
    }

    try {
      if (temaEditando) {
        const sucesso = await updateTema(temaEditando, nomeTema);  // Função assíncrona
        if (sucesso) {
          Alert.alert('Sucesso', 'Tema atualizado com sucesso!');
        }
      } else {
        const sucesso = await addTema(nomeTema);  // Função assíncrona
        if (sucesso) {
          Alert.alert('Sucesso', 'Tema cadastrado com sucesso!');
        }
      }
      setNomeTema('');
      setTemaEditando(null);
      carregarTemas();  // Recarregar os temas
    } catch (error) {
      console.error("Erro ao cadastrar/editar tema:", error);
    }
  };

  const editarTema = (tema) => {
    setNomeTema(tema.nome);
    setTemaEditando(tema.id);
  };

  const excluirTema = async (id) => {
    try {
      const sucesso = await deleteTema(id);  // Função assíncrona
      if (sucesso) {
        Alert.alert('Sucesso', 'Tema excluído com sucesso!');
        carregarTemas();
      }
    } catch (error) {
      console.error("Erro ao excluir tema:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>BrainBuster</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do tema"
          value={nomeTema}
          onChangeText={setNomeTema}
        />

        <TouchableOpacity style={styles.button} onPress={cadastrarOuEditarTema}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Temas já cadastrados</Text>

        <ScrollView style={styles.scrollContainer}>
          {temas.map((tema) => (
            <View key={tema.id} style={styles.temaItem}>
              <Text style={styles.temaNome}>
                {tema.nome} {'\n'}Nº de perguntas: {tema.numPerguntas}
              </Text>
              <TouchableOpacity onPress={() => editarTema(tema)}>
                <Text style={styles.actionButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirTema(tema.id)}>
                <Text style={styles.actionButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C2F7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#DEAB04',
    fontSize: 36,
    fontFamily: 'Jura_400Regular',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    padding: 10,
    marginBottom: 15,
    color: '#5C2F7A',
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Jura_400Regular',
  },
  scrollContainer: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    maxHeight: 200,
    padding: 10,
    marginBottom: 20,
  },
  temaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  temaNome: {
    color: '#5C2F7A',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
  },
  actionButton: {
    color: '#5C2F7A',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
    marginLeft: 10,
  },
});
