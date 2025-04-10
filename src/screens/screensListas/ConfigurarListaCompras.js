import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext'

export default function ConfigurarListaCompras() {
    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const { criarDivida } = useContext(MainContext);


    return (
        <SafeAreaView>
            <Text>Configurar Lista</Text>
            <Text>Você está editando a lista {listName} - {listId}</Text>
        </SafeAreaView>
    );
}