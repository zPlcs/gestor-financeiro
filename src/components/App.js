import React from 'react'
import Home from '../screens/Home'

import Listas from '../screens/screensListas/Listas'
import CriarLista from '../screens/screensListas/CriarLista'
import ConfigurarLista from '../screens/screensListas/ConfigurarLista'
import ConfigurarListaCompras from '../screens/screensListas/ConfigurarListaCompras'
import CriarDivida from '../screens/screensDividas/CriarDivida'
import CategoriasDividas from '../screens/screensCategoriasDividas/CategoriasDividas'
import CriarCategoriaDivida from '../screens/screensCategoriasDividas/CriarCategoriaDivida'
import EditarCategoriaDivida from '../screens/screensCategoriasDividas/EditarCategoriaDivida'
import EditarDivida from '../screens/screensDividas/EditarDivida'
import CriarItem from '../screens/screensItens/CriarItem'
import CategoriasItens from '../screens/screensCategoriasItens/CategoriasItens'
import CriarCategoriaItem from '../screens/screensCategoriasItens/CriarCategoriaItem'

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
        <Stack.Screen name ='CriarDivida' component={CriarDivida} />
        <Stack.Screen name ='CategoriasDividas' component={CategoriasDividas} />
        <Stack.Screen name ='CriarCategoriaDivida' component={CriarCategoriaDivida} />
        <Stack.Screen name ='EditarCategoriaDivida' component={EditarCategoriaDivida} />
        <Stack.Screen name='EditarDivida' component={EditarDivida} />
        <Stack.Screen name='CriarItem' component={CriarItem} />
        <Stack.Screen name='CategoriasItens' component={CategoriasItens} />
        <Stack.Screen name='CriarCategoriaItem' component={CriarCategoriaItem} />
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