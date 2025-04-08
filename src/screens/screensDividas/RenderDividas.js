import React, { useContext, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation } from '@react-navigation/native';

export default function RenderDividas({ item }) {
    const navigation = useNavigation()
    const { deletarDivida } = useContext(MainContext)

    const handleAtualizarDivida = () => {
        navigation.navigate('EditarDivida', {
            listId: item.listId,
            name: item.name,
            value: item.value,
            date: item.date,
        })
    }

    const handleDeletarDivida = async () => {
        try {
            await deletarDivida(item.id)
        } catch (error) {
            console.error('Erro ao deletar dívida', error)
        }
    }
    return (
        <View>
            <Text>{listId}</Text>
            <Text>{listName}</Text>
            <Text>{item.name}</Text>
            <Text>{item.value}</Text>
            <Text>{item.date}</Text>
            <Button onPress={handleAtualizarDivida} title='Editar Divida' />
            <Button onPress={handleDeletarDivida} title='Apagar Divda' />
        </View>
    );
}