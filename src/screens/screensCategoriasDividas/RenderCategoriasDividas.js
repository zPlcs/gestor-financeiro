import React, { useState, useContext, useEffect } from 'react'
import { View, Button, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext';

export default function RenderCategoriasDividas({ item }) {

    const { deletarCategoriaDivida, debt } = useContext(MainContext)

    const navigation = useNavigation();
    const handleAtualizarCategoriaDivida = () => {
        navigation.navigate('EditarCategoriaDivida', {
            previousId: item.id,
            previousName: item.name
        })
    }

    const dividaId = debt.find(cat => cat.category_id === item.id)

    const verify = async () => {
        try{
            
            if (dividaId) {
                console.log('encontrado')
                cancelarExclusaoCategoriaDivida()
            } else {
                console.log('Não encontrado')
                await deletarCategoriaDivida(item.id)
            }
        } catch (error){
            console.error('Erro ao tentar verificar categoria id', error)
        }

    }

    const cancelarExclusaoCategoriaDivida =  async () => {
        try{
            Alert.alert('Não foi possível apagar a categoria', `A categoria "${item.name}" está atrelada a uma dívida existente.`, [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'cancel',
                }
            ]);
        } catch(error){
            console.error('Erro ao deletar', error)
        }

    }



    const handleDeletarCategoriaDivida = async () => {
        try {
            verify();  
        } catch (error) {
            console.error('Erro ao deletar categoria da divida', error)
        }
    }

    return (
        <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Button title='Editar Categoria' onPress={handleAtualizarCategoriaDivida} />
            <Button title='Apagar categoria' onPress={handleDeletarCategoriaDivida} />
        </View>
    );
}