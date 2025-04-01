import React from 'react'
import Home from '../screens/Home'
import CriarDivida from '../screens/CriarDivida'
import { MainProvider } from '../context/MainContext'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function RootTab() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='CriarDivida' component={RootStack} />
      </Tab.Navigator>
    );
  }

  function RootStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={CriarDivida} options={{ headerShown: false }} />
      </Stack.Navigator>);
  }

  return (
    <MainProvider>
      <NavigationContainer>
        <RootTab />
      </NavigationContainer>
    </MainProvider>
  );
}