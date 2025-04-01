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
        setDividaList,
        criarDivida,
        ClearForm
    } = useContext(MainContext);

    function CriarDivida(){
        try{
            const novaDivida = { name, value, date, id: Math.floor(new Date().valueOf() * Math.random())  };
            setDividaList(prevDivida => [...prevDivida, novaDivida]);
            criarDivida(novaDivida);
            ClearForm();
            navigation.goBack();
        } catch (error) {
            console.error("Falha ao criar dívida:", error);
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