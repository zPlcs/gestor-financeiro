import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Style from '../style/style'

export function ButtonEditar(props) {
    return (
        <>
            <TouchableOpacity
                style={Style.button}
                onPress={props.onPress}>
                <Text style={Style.infoText}>Editar</Text>
            </TouchableOpacity>
        </>
    );
}

export function ButtonApagar(props) {
    return (
        <>
            <TouchableOpacity
                style={Style.button}
                onPress={props.onPress}>
                <Text style={Style.infoText}>Apagar</Text>
            </TouchableOpacity>
        </>
    );
}
{/* 
    const Style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: '#afafaf',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    width: '45%',
  },

  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
*/}

