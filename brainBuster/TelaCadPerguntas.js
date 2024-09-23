import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
    getTemas((result) => {
      setTemas(result);
    });
  }, []);

  const validarTexto = (texto) => {
    const textoValido = /^[a-zA-Z0-9\s?!.,]+$/;
    return texto.length > 1 && textoValido.test(texto);
  };

  const cadastrarPergunta = () => {
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

    addPergunta(
      temaSelecionado,
      pergunta,
      [respostaCerta, resposta2, resposta3, resposta4],
      respostaCerta,
      () => {
        Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
        navigation.navigate('Home');
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>

      <Text style={styles.label}>Selecione seu tema</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={temaSelecionado}
          style={styles.picker}
          onValueChange={(itemValue) => setTemaSelecionado(itemValue)}
        >
          <Picker.Item label="Selecione um tema" value={null} />
          {temas.map((tema) => (
            <Picker.Item key={tema.id} label={tema.nome} value={tema.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Escreva sua pergunta</Text>
      <ScrollView style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={4}
          value={pergunta}
          onChangeText={setPergunta}
        />
      </ScrollView>

      <Text style={styles.label}>Escreva suas respostas</Text>

      <TextInput
        style={styles.input}
        placeholder="Resposta Certa"
        value={respostaCerta}
        onChangeText={setRespostaCerta}
      />
      <TextInput
        style={styles.input}
        placeholder="Resposta 2"
        value={resposta2}
        onChangeText={setResposta2}
      />
      <TextInput
        style={styles.input}
        placeholder="Resposta 3"
        value={resposta3}
        onChangeText={setResposta3}
      />
      <TextInput
        style={styles.input}
        placeholder="Resposta 4"
        value={resposta4}
        onChangeText={setResposta4}
      />

      <TouchableOpacity style={styles.button} onPress={cadastrarPergunta}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

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
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#5C2F7A',
  },
  textAreaContainer: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    height: 100,
    marginBottom: 20,
  },
  textArea: {
    height: '100%',
    padding: 10,
    textAlignVertical: 'top',
    color: '#5C2F7A',
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
    marginTop: 10,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
