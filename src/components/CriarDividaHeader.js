import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CriarDividaHeader() {
  return (
    <View style={Style.container}>
      <View style={Style.header}>
        <Text style={Style.headerMainText}>Criar Dívida</Text>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container:{
    justifyContent: 'center'
  },

  header: {
    height: 150,
    backgroundColor: 'gray',
    padding: 20,
    justifyContent:'center',
    alignItems: 'center'
  },

  headerMainText:{
    fontSize: 30,
    fontWeight: 'bold'
  },
});
