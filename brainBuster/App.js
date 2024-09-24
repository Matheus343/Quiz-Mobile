import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import TelaSetup from './TelaSetup';
import TelaCadTemas from './TelaCadTemas';
import TelaCadPerguntas from './TelaCadPerguntas';
import TelaJogo from './TelaJogo';
import TelaResultado from './TelaResultado';
import TelaCriadores from './TelaCriadores';
import Lobby from './Lobby'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lobby">
        <Stack.Screen name="Lobby" component={Lobby} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="TelaSetup" component={TelaSetup} options={{ headerShown: false }} />
        <Stack.Screen name="TelaCadTemas" component={TelaCadTemas} options={{ headerShown: false }}/>
        <Stack.Screen name="TelaCadPerguntas" component={TelaCadPerguntas} options={{ headerShown: false }} />
        <Stack.Screen name="TelaJogo" component={TelaJogo} options={{ headerShown: false }} />
        <Stack.Screen name="TelaResultado" component={TelaResultado} options={{ headerShown: false }} />
        <Stack.Screen name="TelaCriadores" component={TelaCriadores} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
