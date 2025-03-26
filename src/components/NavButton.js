import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavButton() {
  const navigation = useNavigation();

  return (
    <View style={Style.container}>
      <TouchableOpacity style={Style.button} onPress={() => navigation.navigate('DividaPage')}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    width: Dimensions.get('window').width / 6
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})