import * as SQLite from 'expo-sqlite';

import React from 'react';
import { View, Text, Button } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { DividaProvider } from '../process/DividaContext';

import HomePage from '../screens/HomeScreens';
import CriarDividaScreen from '../screens/CriarDividaScreen';

import Style from '../style/style';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return <HomePage />;
}

function CriarDivida() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Teste" onPress={() => navigation.navigate('DividaPage')} />
    </View>
  );
}

function Perfil() {
  return (
    <View>
      <Text>Página de perfil</Text>
    </View>
  );
}

function RootStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Tela de Dívida" component={CriarDividaScreen} />
      </Stack.Navigator>
    </>
  );
}

function RootTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="DividaPage"
        component={RootStack}
        options={{
          tabBarButton: () => <CriarDivida />,
          headerShown: false,
        }}
      />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DividaProvider>
      <NavigationContainer>
        <RootTab />
      </NavigationContainer>
    </DividaProvider>
  );
}
