import React, {useContext} from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext';

export default function Home() {
    const{ deletarBD } = useContext(MainContext)

    const handleDeletarBD = async () =>{
        try{
            await deletarBD()
        } catch(error){
            console.error('Erro ao tentar deletar banco de dados', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Button title='Apagar banco de dados' onPress={handleDeletarBD}/>
        </SafeAreaView>
    );
}