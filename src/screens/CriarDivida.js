import React, { useContext } from 'react'
import { View, TextInput, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useNavigation } from '@react-navigation/native';

export default function CriarDivida() {
    const navigation = useNavigation();
    const {
        name, setName,
        value, setValue,
        date, setDate,
        criarDivida,
        ClearForm,
    } = useContext(MainContext);

    const CriarDivida = async () => {
        try {
            const novaDivida = { name, value, date };
            await criarDivida(novaDivida);
            ClearForm();
            navigation.goBack();
        } catch (error) {
            console.error("Falha ao criar dívida (Func. CriarDivida() => CriarDivida.js):", error);
        }
    }
    return (
        <View>
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
            <Button title='Salvar Dívida' onPress={CriarDivida} />
        </View>
    );
}