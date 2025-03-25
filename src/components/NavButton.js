import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native'

export default function NavButton(){
  return(
    <View style={Style.container}>
      <TouchableOpacity style={Style.button}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
  button:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    width:Dimensions.get('window').width / 6
  },

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})