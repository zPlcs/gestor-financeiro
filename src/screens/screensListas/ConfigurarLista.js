import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext'

export default function ConfigurarLista() {
    const navigation = useNavigation();

    const { debt } = useContext(MainContext)

    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const debtsDaLista = debt.filter(d => d.list_id === listId);

    const handleCriarDividas = () => {
        navigation.navigate('CriarDivida', {
            listId: listId,
            listName: listName
        })
    }

    const handleCategoriasDividas = () => {
        navigation.navigate('CategoriasDividas')
    }

    const key = (p) => {
        return p.id
    }

    const rend = ({ item }) => {
        return (
            <View>
                <Text>{listId}</Text>
                <Text>{listName}</Text>
                <Text>{item.name}</Text>
                <Text>{item.value}</Text>
            </View>

        );
    }

    return (
        <SafeAreaView>
            <Text>Configurar Lista</Text>
            <Text>Você está editando a lista {listName} - {listId}</Text>
            <Button
                title='Adicionar Divida'
                onPress={handleCriarDividas}
            />
            <Button
                title='Configurar Categorias'
                onPress={handleCategoriasDividas}
            />

            {debtsDaLista.length > 0 ? (
                <FlatList
                    data={debtsDaLista}
                    keyExtractor={key}
                    renderItem={rend}
                />
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    Nenhuma dívida cadastrada nesta lista
                </Text>
            )}
        </SafeAreaView>
    );
}