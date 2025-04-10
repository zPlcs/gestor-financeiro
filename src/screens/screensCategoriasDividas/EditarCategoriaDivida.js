import React, {useState, useContext} from 'react'
import { SafeAreaView, Text, View, Button, TextInput } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCategoriaDivida(){
    const navigation = useNavigation()

    const{ atualizarCategoriaDivida } = useContext(MainContext)

    const route = useRoute();
    const {
        previousId,
        previousName,
    } = route.params;

    const[name,setName] = useState('')

    const handleAtualizarCategoriaDivida = async () =>{
        try{
            const novaCategoria = { name }
            await atualizarCategoriaDivida(previousId,novaCategoria)
            setName('')
            navigation.goBack()
        } catch(error){
            console.error('Erro ao atualizar categoria da divida', error)
        }
    }

    return(
        <SafeAreaView>
            <Text>Editar Categoria</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder={previousName}
            />
            <Button title='Atualizar categoria' onPress={handleAtualizarCategoriaDivida}/>
        </SafeAreaView>

    );
}