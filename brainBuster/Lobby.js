import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts, Jura_400Regular } from '@expo-google-fonts/jura';
import AppLoading from 'expo-app-loading';

export default function Lobby({ navigation }) {
  let [fontsLoaded] = useFonts({
    Jura_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>
      
      <View style={styles.shapeContainer}>
        <View style={styles.customShape}></View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.helpButton} 
        onPress={() => navigation.navigate('TelaCriadores')}>
        <Text style={styles.helpButtonText}>?</Text>
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
    fontSize: 30,
    fontFamily: 'Jura_400Regular',
    marginBottom: 20,
  },
  shapeContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customShape: {
    backgroundColor: '#DEAB04',
    width: 800,
    height: 300,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 790,
    borderTopLeftRadius: 740,
    borderTopRightRadius: 20,
    marginTop: 100,
    transform: [{ rotate: '45deg' }], 
  },
  button: {
    backgroundColor: '#DEAB04',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 550,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 15,
    fontFamily: 'Jura_400Regular',
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 13,
    backgroundColor: '#DEAB04',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 80,
  },
  helpButtonText: {
    color: '#5C2F7A',
    fontSize: 20,
    marginBottom: 2,
    fontFamily: 'Jura_400Regular',
  },
});
