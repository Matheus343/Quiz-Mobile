import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createTables } from './database';
import React, { useEffect } from 'react';


export default function Home({ navigation }) {
  useEffect(() => {
    const setupDatabase = async () => {
      await createTables();
    };
    setupDatabase();
  }, []);
  
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
        onPress={() => navigation.navigate('Lobby')}>
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
    flex: 0.6,
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
});
