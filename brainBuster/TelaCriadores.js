import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaCriadores({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>

      <Text style={styles.subtitle}>Projeto construído por:</Text>

      <View style={styles.creditsContainer}>
        <View style={styles.creditRow}>
          <Text style={styles.creditName}>Matheus Galdino Xavier</Text>
          <Text style={styles.creditId}>082210042</Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditName}>Yasmin Laisa Maciel</Text>
          <Text style={styles.creditId}>082210040</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
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
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
    marginBottom: 20,
  },
  creditsContainer: {
    marginBottom: 40,
  },
  creditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 10,
  },
  creditName: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
  },
  creditId: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
