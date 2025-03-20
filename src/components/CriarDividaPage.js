import React from 'react'
import { TextInput, Text, View, Button, useState } from 'react-native'

export default function CriarDividaPage(){
const [divida,setDivida] = useState('')
const [dividaList, setDividaList] = useState([])
    return(
        <View>
            <Text>Insira os dados da sua dívida</Text>
            <Text>Nome</Text>
            <TextInput />
            <Text>Descrição</Text>
            <TextInput />
            <Text>Valor<Text>
            <TextInput />
            <Text>Data de compra</Text>
            <TextInput />
            <Button title='Criar divida' onPress={() => {}}
        <View>
    );
}