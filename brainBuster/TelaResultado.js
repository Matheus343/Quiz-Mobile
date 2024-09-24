import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaResultado({ route, navigation }) {
  const { resultadoFinal, respostas } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>
      <Text style={styles.subtitle}>PARABÉNS!</Text>
      <Text style={styles.subtitle}>SUA PONTUAÇÃO FOI DE</Text>

      <View style={styles.circle}>
        <Text style={styles.score}>{resultadoFinal}%</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lobby')}>
        <Text style={styles.buttonText}>Início</Text>
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
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
    marginBottom: 10,
  },
  circle: {
    backgroundColor: '#DEAB04',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  score: {
    color: '#5C2F7A',
    fontSize: 36,
    fontFamily: 'Jura_400Regular',
  },
  resultContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText: {
    color: '#5C2F7A',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
    marginRight: 10,
  },
  scoreText: {
    color: '#5C2F7A',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Jura_400Regular',
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
