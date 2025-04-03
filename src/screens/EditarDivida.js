import React, { useContext, useEffect } from 'react'
import { View, TextInput, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        ClearFormDivida
    } = useContext(MainContext)

    useEffect(() => {
        setName(dividaName);
        setValue(dividaValue);
        setDate(dividaDate);
        return () => {
            ClearFormDivida();
        };
    }, []);

    const handleEditar = async () => {
        try {
            const updatedData = {
                name: name || dividaName,
                value: value || dividaValue,
                date: date || dividaDate
            }
            const hasChanged = name !== dividaName || value !== dividaValue || date !== dividaDate;

            if (hasChanged) {
                await editarDivida(dividaID, updatedData);
            }
            ClearFormDivida();
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar', error)
        }
    };
    return (
        <SafeAreaView>
            <Text>{dividaID}</Text>
            <Text>{dividaName}</Text>
            <Text>{dividaValue}</Text>
            <Text>{dividaDate}</Text>
            <Text>Nome:</Text>
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
        </SafeAreaView>
    );
}