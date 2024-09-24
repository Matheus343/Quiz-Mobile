import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getTemas } from './database';

export default function TelaSetup({ navigation }) {
  const [temaSelecionado, setTemaSelecionado] = useState(null);
  const [temas, setTemas] = useState([]);
  const [quantidadePerguntas, setQuantidadePerguntas] = useState(3);

  useEffect(() => {
    carregarTemas();
  }, []);

  const carregarTemas = async () => {
    try {
      const temasObtidos = await getTemas();
      setTemas(temasObtidos);
    } catch (error) {
      console.error("Erro ao carregar temas:", error);
    }
  };

  const iniciarJogo = () => {
    if (!temaSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione um tema.');
      return;
    }
    navigation.navigate('TelaJogo', { temaId: temaSelecionado, quantidade: quantidadePerguntas });
  };

  return (
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

      <Text style={styles.label}>Selecione a quantidade de perguntas</Text>
      <View style={styles.quantidadeContainer}>
        {[3, 5, 7].map((quantidade) => (
          <TouchableOpacity
            key={quantidade}
            style={[
              styles.quantidadeButton,
              quantidadePerguntas === quantidade && styles.quantidadeButtonSelecionado,
            ]}
            onPress={() => setQuantidadePerguntas(quantidade)}
          >
            <Text style={styles.quantidadeButtonText}>{quantidade} perguntas</Text>
          </TouchableOpacity>
        ))}
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
  quantidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantidadeButton: {
    backgroundColor: '#DEAB04',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  quantidadeButtonSelecionado: {
    backgroundColor: '#FFFF',
  },
  quantidadeButtonText: {
    color: '#5C2F7A',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
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
