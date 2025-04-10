import React, { useContext, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, FlatList, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext'
import RenderDividas from '../screensDividas/RenderDividas'

export default function ConfigurarLista() {

    const navigation = useNavigation();

    const { debt, categoryDebt } = useContext(MainContext)

    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const debtsDaLista = debt.filter(d => d.list_id === listId);
    const dividaId = categoryDebt.find(cat => cat.id)


    const verify = () => {
        if (dividaId) {
            handleCriarDividas()
        } else {
            Alert.alert('Nenhuma categoria criada', `Para criar uma divida, primeiro crie uma categoria.`, [
                {
                    text: 'Ok',
                    onPress: () => { },
                    style: 'cancel',
                }
            ]);
        }
    }

    const handleCriarDividas = () => {
        navigation.navigate('CriarDivida', {
            listId: listId,
            listName: listName
        })
    }

    const handleCategoriasDividas = () => {
        navigation.navigate('CategoriasDividas')
        console.log('teste')
    }

    const key = (p) => {
        return p.id
    }

    return (
        <SafeAreaView>
            <Text>Configurar Lista</Text>
            <Text>Você está editando a lista {listName} - {listId}</Text>
            <Button
                title='Adicionar Divida'
                onPress={verify}
            />
            <Button
                title='Configurar Categorias'
                onPress={handleCategoriasDividas}
            />

            {debtsDaLista.length > 0 ? (
                <FlatList
                    style={{ height: 400 }}
                    data={debtsDaLista}
                    keyExtractor={key}
                    renderItem={({ item }) => <RenderDividas item={item} listId={listId} />}
                />
            ) : (
                <Text>
                    Nenhuma dívida cadastrada nesta lista
                </Text>
            )}
        </SafeAreaView>
    );
}