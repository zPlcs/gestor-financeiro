import React, { useContext } from 'react'
import {
    SafeAreaView,
    TextInput,
    Text,
    View,
    Button
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../context/MainContext'

export default function EditarList() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        selectedListID,
        selectedNameList,
        selectedTemplateList
    } = route.params;

    const {
        nameList, setNameList,
        atualizarList
    } = useContext(MainContext)

    const handleEditar = async () => {
        try {
            const updatedData = { nameList, template: selectedTemplateList  }
            await atualizarList(selectedListID, updatedData);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar', error)
        }
    };

    return (
        <SafeAreaView>
            <Text>Editar Lista</Text>
            <Text>{selectedListID}</Text>
            <Text>{selectedNameList}</Text>
            <Text>{selectedTemplateList}</Text>
            <Text>Alterar nome:</Text>
            <TextInput
                value={nameList}
                onChangeText={setNameList}
            />
            <Button title='Editar lista' onPress={handleEditar} />
        </SafeAreaView>
    );
}