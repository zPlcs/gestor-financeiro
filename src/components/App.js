import React from 'react'
import Home from '../screens/Home'

import Listas from '../screens/Listas'
import CriarLista from '../screens/CriarLista'
import ConfigurarLista from '../screens/ConfigurarLista'
import ConfigurarListaCompras from '../screens/ConfigurarListaCompras'
import Dividas from '../screens/Dividas'
import CategoriasDividas from '../screens/CategoriasDividas'

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
        <Tab.Screen name='ListasTab' component={ListaStack} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    )
  }

  function ListaStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='Listas' component={Listas} />
        <Stack.Screen name='CriarLista' component={CriarLista} />
        <Stack.Screen name ='ConfigurarLista' component={ConfigurarLista} />
        <Stack.Screen name ='ConfigurarListaCompras' component={ConfigurarListaCompras} />
        <Stack.Screen name ='Dividas' component={Dividas} />
        <Stack.Screen name ='CategoriasDividas' component={CategoriasDividas} />
      </Stack.Navigator>
    )
  }

  return (
    <MainProvider>
      <NavigationContainer>
        <RootTab />
      </NavigationContainer>
    </MainProvider>

  )
}