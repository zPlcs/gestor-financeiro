import React, { useContext } from 'react'
import {
    SafeAreaView,
    Text,
    Button,
    FlatList,
    View
} from 'react-native'

import { MainContext } from '../context/MainContext'

import { useNavigation } from '@react-navigation/native';

export default function Listas() {
    const navigation = useNavigation();
    const { lists, deletarList } = useContext(MainContext)

    const navCriarLista = () => {
        navigation.navigate('CriarLista')
    }


    const rend = ({ item }) => {
        const handleDelete = async () => {
            try {
                await deletarList(item.id);
            } catch (error) {
                console.error('erro ao deletar')
            }
        }

        const handleEditar = () => {
            navigation.navigate('EditarLista', {
                selectedListID: item.id,
                selectedNameList: item.name,
                selectedTemplateList: item.template,
            });
        }
        return (
            <View>
                <Text>{item.name}</Text>
                <Text>{item.template}</Text>
                <Button title='Editar' onPress={handleEditar}/>
                <Button title='Apagar' onPress={handleDelete} />
                <Text></Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <Text>Listas</Text>
            <Button title='Criar Lista' onPress={navCriarLista} />
            <FlatList
                data={lists}
                keyExtractor={(p) => p.id}
                renderItem={rend}
            />
        </SafeAreaView>
    );
}