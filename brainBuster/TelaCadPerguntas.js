import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { getTemas, addPergunta } from './database';

export default function TelaCadPerguntas({ navigation }) {
  const [temaSelecionado, setTemaSelecionado] = useState(null);
  const [temas, setTemas] = useState([]);
  const [pergunta, setPergunta] = useState('');
  const [respostaCerta, setRespostaCerta] = useState('');
  const [resposta2, setResposta2] = useState('');
  const [resposta3, setResposta3] = useState('');
  const [resposta4, setResposta4] = useState('');

  useEffect(() => {
    const carregarTemas = async () => {
      const result = await getTemas();
      setTemas(result);
    };
    carregarTemas();
  }, []);

  const validarTexto = (texto) => {
    return texto.length > 1;
  };

  const cadastrarPergunta = async () => {
    if (!temaSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione um tema.');
      return;
    }

    if (!validarTexto(pergunta)) {
      Alert.alert('Erro', 'Por favor, insira uma pergunta válida.');
      return;
    }

    if (!validarTexto(respostaCerta) || !validarTexto(resposta2) || !validarTexto(resposta3) || !validarTexto(resposta4)) {
      Alert.alert('Erro', 'Por favor, insira respostas válidas.');
      return;
    }

    try {
      const sucesso = await addPergunta({
        tema_id: temaSelecionado,
        pergunta: pergunta,
        correta: respostaCerta,
        alternativas: [resposta2, resposta3, resposta4, respostaCerta],
      });

      if (sucesso) {
        Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
        navigation.navigate('Home');
      } else {
        throw new Error("Falha ao cadastrar a pergunta");
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar a pergunta.');
      console.error("Erro ao cadastrar pergunta:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>BrainBuster</Text>

        <Text style={styles.label}>Selecione seu tema</Text>
        <View style={styles.temasContainer}>
          {temas.map((tema) => (
            <TouchableOpacity
              key={tema.id}
              style={[
                styles.temaButton,
                temaSelecionado === tema.id && styles.temaButtonSelecionado,
              ]}
              onPress={() => setTemaSelecionado(tema.id)}
            >
              <Text style={styles.temaButtonText}>{tema.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Escreva sua pergunta</Text>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={4}
          value={pergunta}
          onChangeText={setPergunta}
          placeholder="Digite a pergunta aqui"
          placeholderTextColor="#5C2F7A"
        />

        <Text style={styles.label}>Escreva suas respostas</Text>

        <TextInput
          style={styles.input}
          placeholder="Resposta Certa"
          value={respostaCerta}
          onChangeText={setRespostaCerta}
          placeholderTextColor="#5C2F7A"
        />
        <TextInput
          style={styles.input}
          placeholder="Resposta 2"
          value={resposta2}
          onChangeText={setResposta2}
          placeholderTextColor="#5C2F7A"
        />
        <TextInput
          style={styles.input}
          placeholder="Resposta 3"
          value={resposta3}
          onChangeText={setResposta3}
          placeholderTextColor="#5C2F7A"
        />
        <TextInput
          style={styles.input}
          placeholder="Resposta 4"
          value={resposta4}
          onChangeText={setResposta4}
          placeholderTextColor="#5C2F7A"
        />

        <TouchableOpacity style={styles.button} onPress={cadastrarPergunta}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 20,
  },
  title: {
    color: '#DEAB04',
    fontSize: 36,
    fontFamily: 'Jura_400Regular',
    marginBottom: 20,
    marginTop: 60,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
    marginBottom: 5,
  },
  temasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  temaButton: {
    backgroundColor: '#DEAB04',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  temaButtonSelecionado: {
    backgroundColor: '#FFFF',
  },
  temaButtonText: {
    color: '#5C2F7A',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
  },
  textArea: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '100%',
    height: 100,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
    color: '#5C2F7A',
  },
  input: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '100%',
    padding: 7,
    marginBottom: 15,
    color: '#5C2F7A',
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 4,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 15,
    fontFamily: 'Jura_400Regular',
  },
});
