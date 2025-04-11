import React, { useContext } from 'react'
import { SafeAreaView, Text, Button, FlatList, View, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { MainContext } from '../../context/MainContext'

export default function Listas() {
    const { list, deletarLista } = useContext(MainContext);
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

        const createTwoButtonAlert = () => {
            Alert.alert('Apagar Lista', `Deseja mesmo apagar a lista "${item.name}"?`, [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Apagar', onPress: handleApagar },
            ]);
        }
        const handleConfigurar = () => {
                navigation.navigate('ConfigurarLista', { 
                    listId: item.id, 
                    listName: item.name,
                    listTemplate: item.template
                });
        }

        const handleConfigurarCompras = () => {
            navigation.navigate('ConfigurarListaCompras', { 
                listId: item.id, 
                listName: item.name,
                listTemplate: item.template
            });
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
                    onPress={createTwoButtonAlert}
                />
                {item.template === 'Simples' || item.template === 'Mensal' ? 
                            <Button
                            title='Configurar Lista'
                            onPress={handleConfigurar}
                        />
                        :
                        <Button
                        title='Configurars Lista'
                        onPress={handleConfigurarCompras}
                    />    
            }
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