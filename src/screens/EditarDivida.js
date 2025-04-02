import React, { useContext } from 'react'
import { View, TextInput, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function EditarDivida() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        dividaID,
        dividaName,
        dividaValue,
        dividaDate
    } = route.params;
    const {
        name, setName,
        value, setValue,
        date, setDate,
        editarDivida,
        ClearForm
    } = useContext(MainContext)

    const handleEditar = async () => {
        try {
            await editarDivida(dividaID, {
                name: name,
                value: value,
                date: date
            });
            ClearForm();
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar', error)
        }
    };
    return (
        <View>
            <Text>{dividaID}</Text>
            <Text>{dividaName}</Text>
            <Text>{dividaValue}</Text>
            <Text>{dividaDate}</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Text>Valor:</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
            />
            <Text>Data:</Text>
            <TextInput
                value={date}
                onChangeText={setDate}
            />
            <Button title='Salvar Dívida' onPress={handleEditar} />
        </View>
    );
}