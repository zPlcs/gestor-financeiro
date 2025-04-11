import React, { useContext } from 'react'
import { SafeAreaView, Text, TextInput, Button } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation } from '@react-navigation/native';

export default function CriarCategoriaItem() {
    const navigation = useNavigation();
    const { criarCategoriaItem, name, setName } = useContext(MainContext)

    const handleCriarCategoriasItens = async () => {
        try {
            const novaCategoria = { name: name }
            await criarCategoriaItem(novaCategoria)
            setName('')
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao criar categoria de item', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Categorias Dividas</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Button
                title='Criar Categoria'
                onPress={handleCriarCategoriasItens}
            />
        </SafeAreaView>

    );
}