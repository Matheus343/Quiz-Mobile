import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { getTemas, addTema, updateTema, deleteTema, countPerguntasByTema } from './database';

export default function TelaCadTemas({ navigation }) {
  const [nomeTema, setNomeTema] = useState('');
  const [temas, setTemas] = useState([]);
  const [temaEditando, setTemaEditando] = useState(null);

  useEffect(() => {
    carregarTemas();
  }, []);

  const carregarTemas = () => {
    getTemas((result) => {
      Promise.all(
        result.map((tema) =>
          countPerguntasByTema(tema.id).then((count) => ({ ...tema, numPerguntas: count }))
        )
      ).then((temasComPerguntas) => {
        setTemas(temasComPerguntas);
      });
    });
  };

  const validarNomeTema = (nome) => {
    const nomeValido = /^[a-zA-Z0-9\s]+$/;
    return nome.length > 1 && nomeValido.test(nome);
  };

  const cadastrarOuEditarTema = () => {
    if (!validarNomeTema(nomeTema)) {
      Alert.alert('Erro', 'Por favor, insira um nome de tema válido.');
      return;
    }

    if (temaEditando) {
      updateTema(temaEditando, nomeTema, () => {
        Alert.alert('Sucesso', 'Tema atualizado com sucesso!');
        setNomeTema('');
        setTemaEditando(null);
        carregarTemas();
      });
    } else {
      addTema(nomeTema, () => {
        Alert.alert('Sucesso', 'Tema cadastrado com sucesso!');
        setNomeTema('');
        carregarTemas();
      });
    }
  };

  const editarTema = (tema) => {
    setNomeTema(tema.nome);
    setTemaEditando(tema.id);
  };

  const excluirTema = (id) => {
    deleteTema(id, () => {
      Alert.alert('Sucesso', 'Tema excluído com sucesso!');
      carregarTemas();
    });
  };

  return (
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
    marginBottom: 15,
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
