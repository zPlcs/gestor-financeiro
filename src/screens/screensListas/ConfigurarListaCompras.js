import React, { useContext, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, FlatList, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext'
import RenderItens from '../screensItens/RenderItens'

export default function ConfigurarListaCompras() {

    const navigation = useNavigation();

    const { item, categoryItem } = useContext(MainContext)

    const route = useRoute();
    const {
        listId,
        listName,
        listTemplate
    } = route.params;

    const itemId = categoryItem.find(cat => cat.id)

    const handleCriarItem = () => {
        if (itemId) {
            navCriarItens()
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

    const navCriarItens = () => {
        navigation.navigate('CriarItem', {
            listId: listId,
            listName: listName
        })
    }

    const handleCategoriasItens = () => {
        navigation.navigate('CategoriasItens')
    }

    const key = (p) => {
        return p.id
    }

    return (
        <SafeAreaView>
            <Text>Configurar Lista</Text>
            <Text>Você está editando a lista {listName} - {listId} - {listTemplate}</Text>
            <Button
                title='Adicionar Item'
                onPress={handleCriarItem}
            />
            <Button
                title='Configurar Categorias de itens'
                onPress={handleCategoriasItens}
            />

            {item ? (
                <FlatList
                    style={{ height: 400 }}
                    data={itensDaLista}
                    keyExtractor={key}
                    renderItem={({ item }) => <RenderItens item={item} listId={listId} />}
                />
            ) : (
                <Text>
                    Nenhuma dívida cadastrada nesta lista
                </Text>
            )}
        </SafeAreaView>
    );
}