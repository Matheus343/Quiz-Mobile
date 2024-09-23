import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Picker, StyleSheet, Alert } from 'react-native';
import { getTemas, countPerguntasByTema } from './database';

export default function TelaSetup({ navigation }) {
  const [temaSelecionado, setTemaSelecionado] = useState(null);
  const [temas, setTemas] = useState([]);
  const [quantidadePerguntas, setQuantidadePerguntas] = useState(3);

  useEffect(() => {
    getTemas((result) => {
      setTemas(result);
    });
  }, []);

  const iniciarJogo = () => {
    if (!temaSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione um tema.');
      return;
    }

    countPerguntasByTema(temaSelecionado, (count) => {
      if (count < quantidadePerguntas) {
        Alert.alert(
          'Erro',
          `O tema selecionado tem apenas ${count} perguntas. Escolha outro tema ou diminua o número de perguntas.`
        );
      } else {
        navigation.navigate('TelaJogo', { temaId: temaSelecionado, quantidade: quantidadePerguntas });
      }
    });
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

      <Text style={styles.label}>Selecione a quantidade de perguntas</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={quantidadePerguntas}
          style={styles.picker}
          onValueChange={(itemValue) => setQuantidadePerguntas(itemValue)}
        >
          <Picker.Item label="3 perguntas" value={3} />
          <Picker.Item label="5 perguntas" value={5} />
          <Picker.Item label="7 perguntas" value={7} />
        </Picker>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={iniciarJogo}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
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
    marginBottom: 40,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Jura_400Regular',
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
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
