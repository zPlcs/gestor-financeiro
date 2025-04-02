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

