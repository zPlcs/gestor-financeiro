import React, { useContext } from 'react'
import { SafeAreaView, Text, Button, FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { MainContext } from '../context/MainContext';

export default function Listas() {
    const { list, deletarLista, categoryDebt, divida } = useContext(MainContext);
    const navigation = useNavigation();

    const nav = () => {
        return navigation.navigate('CriarLista')
    }

    const key = (p) => {
        return p.id
    }

    const rend = ({ item }) => {
        const handleApagar = async () => {
            try {
                await deletarLista(item.id)
            } catch (error) {
                console.error('Erro ao apagar Lista', error)
            }
        }

        const handleConfigurar = () => {
            if(item.template === 'Simples' || 'Mensal'){
                navigation.navigate('ConfigurarLista',{
                    listId: item.id,
                    listName: item.name
                })
            } else {
                navigation.navigate('ConfigurarListaCompras',{
                    listId: item.id,
                    listName: item.name
                })
            }
        }

        

        return (
            <View>
                <Text>{item.name}</Text>
                <Text>{item.template}</Text>
                <Button
                    title='Editar Lista'
                    onPress={() => { }}
                />
                <Button
                    title='Apagar Lista'
                    onPress={handleApagar}
                />
                <Button
                    title='Configurar Lista'
                    onPress={handleConfigurar}
                />
            </View>

        );
    }
    return (
        <SafeAreaView>
            <Text>Lista</Text>
            <Button
                title='Criar Lista'
                onPress={nav}
            />
            <FlatList
                data={list}
                keyExtractor={key}
                renderItem={rend}
            />

        </SafeAreaView>
    );
}