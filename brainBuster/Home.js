import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TelaSetup')}>
        <Text style={styles.buttonText}>COMEÇAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TelaCadTemas')}>
        <Text style={styles.buttonText}>Cadastro de temas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TelaCadPerguntas')}>
        <Text style={styles.buttonText}>Cadastro de perguntas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.smallButton} 
        onPress={() => navigation.navigate('App')}>
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
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
  smallButton: {
    backgroundColor: '#DEAB04', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
});
