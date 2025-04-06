import React, { useContext, useState } from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    Button
} from 'react-native'

import { MainContext } from '../context/MainContext'
import { Picker } from '@react-native-picker/picker';

export default function CreateList() {
    const {
        nameList, setNameList,
        criarList
    } = useContext(MainContext);

    const [template, setTemplate] = useState('Simples');

    const CriarList = async () => {
        try {
            const newList = {
                name: nameList,
                template,
            };
            await criarList(newList);
        } catch (error) {
            console.error('Falha ao criar lista (func. CriarList() => CriarLista.js', error)
        }
    }
    return (
        <SafeAreaView>
            <Text>Criar lista</Text>
            <TextInput
                value={nameList}
                onChangeText={setNameList}
            />
            <Text>Template</Text>
            <Picker
                selectedValue={template}
                onValueChange={(itemValue) => setTemplate(itemValue)}>
                <Picker.Item label="Mensal" value="Mensal" />
                <Picker.Item label="Simples" value="Simples" />
                <Picker.Item label="Compras" value="Compras" />
            </Picker>
            <Button title='salvar lista' onPress={CriarList} />
        </SafeAreaView>
    );
}