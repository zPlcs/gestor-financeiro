import React ,{ useState } from 'react'
import { TextInput, Text, View, Button, useState } from 'react-native'

export default function CriarDividaPage(){
const [divida,setDivida] = useState('')
const [dividaList, setDividaList] = useState([])
    return(
        <View>
            <Text>Insira os dados da sua dívida</Text>
            <Text>Nome</Text>
            <TextInput 
            onChangeText={setDivida}
            value={divida}
            />
            <Text>Descrição</Text>
            <TextInput 
            onChangeText={setDivida}
            value={divida}
            />
            <Text>Valor</Text>
            <TextInput 
            onChangeText={setDivida}
            value={divida}
            />
            <Text>Data de compra</Text>
            <TextInput 
            onChangeText={setDivida}
            value={divida}
            />
            <Button title='Criar divida' onPress={() => {}} />
        </View>
    );
}