import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={Style.container}>
      <View style={Style.header}>
        <Text style={Style.headerMainText}>Olá Usuário!</Text>
        <Text style={Style.headerText}>Proxíma fatura (dia a pagar):</Text>
        <Text style={Style.headerText}>valor fatura</Text>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems:'top'
    
  },

  header: {
    height: 150,
    backgroundColor: 'gray',
    padding: 20,
    justifyContent:'space-between'
  },

  headerMainText:{
    fontSize: 30,
    fontWeight: 'bold'
  },

  headerText:{
    fontSize: 20,
  },
});
