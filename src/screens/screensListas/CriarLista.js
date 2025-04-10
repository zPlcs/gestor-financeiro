import React, { useContext, useState } from 'react'
import { SafeAreaView, Text, TextInput, Button } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function CriarLista() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('Simples');

    const { criarLista } = useContext(MainContext)

    const handleCreateList = async () => {
        try {
            await criarLista({
                name: name,
                template: selectedTemplate
            });
            setName('');
            setSelectedTemplate('Simples');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao criar lista', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Insira o nome:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Picker
                selectedValue={selectedTemplate}
                onValueChange={(itemValue) =>
                    setSelectedTemplate(itemValue)
                }>
                <Picker.Item label="Simples" value="Simples" />
                <Picker.Item label="Mensal" value="Mensal" />
                <Picker.Item label="Compras" value="Compras" />
            </Picker>
            <Button
                title='Criar Lista'
                onPress={handleCreateList}
            />
        </SafeAreaView>
    );
}