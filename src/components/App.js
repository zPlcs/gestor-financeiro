import React from 'react'
import Home from '../screens/Home'

import EditarDivida from '../screens/EditarDivida'
import CriarCategoria from '../screens/CriarCategoria'
import CriarLista from '../screens/CriarLista'
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
        <Tab.Screen name='HomeTab' component={HomeStack} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='CriarCategoria' component={CriarCategoria} />
        <Stack.Screen name='EditDivida' component={EditarDivida} />
        <Stack.Screen name='CriarDivida' component={CriarDivida} />
        <Stack.Screen name='CriarLista' component={CriarLista} />
      </Stack.Navigator>
    )
  }

  function RootStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='CriarDivida' component={CriarDivida}/>
      </Stack.Navigator>
    );
  }

  return (
    <MainProvider>
      <NavigationContainer>
        <RootTab />
      </NavigationContainer>
    </MainProvider>

  )
}