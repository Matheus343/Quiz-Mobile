import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Jura_400Regular } from '@expo-google-fonts/jura';
import { AppLoading } from 'expo';

import Home from './Home';
import TelaSetup from './TelaSetup';
import TelaCadTemas from './TelaCadTemas';
import TelaCadPerguntas from './TelaCadPerguntas';
import TelaJogo from './TelaJogo';
import TelaResultado from './TelaResultado';
import TelaCriadores from './TelaCriadores';

const Stack = createStackNavigator();

function Lobby({ navigation }) {
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
        <View style={styles.yellowShape}></View>
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TelaSetup" component={TelaSetup} />
        <Stack.Screen name="TelaCadTemas" component={TelaCadTemas} />
        <Stack.Screen name="TelaCadPerguntas" component={TelaCadPerguntas} />
        <Stack.Screen name="TelaJogo" component={TelaJogo} />
        <Stack.Screen name="TelaResultado" component={TelaResultado} />
        <Stack.Screen name="TelaCriadores" component={TelaCriadores} />
      </Stack.Navigator>
    </NavigationContainer>
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
  shapeContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowShape: {
    backgroundColor: '#DEAB04',
    width: 300,
    height: 300,
    borderRadius: 150,
    transform: [{ scaleX: 1.2 }, { scaleY: 0.5 }],
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
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#DEAB04',
    padding: 10,
    borderRadius: 50,
  },
  helpButtonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
