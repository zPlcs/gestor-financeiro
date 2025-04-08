import React, { useContext } from 'react'
import { SafeAreaView, Text, TextInput, Button } from 'react-native'
import { MainContext } from '../context/MainContext';
import { useNavigation } from '@react-navigation/native';

export default function CategoriasDividas() {
    const navigation = useNavigation();
    const { criarCategoriaDivida, name, setName, setCategoryDebt, categoryDebt } = useContext(MainContext)

    const handleCriarCategoriasDividas = async () => {
        try {
            const novaCategoria = { name: name }
            await criarCategoriaDivida(novaCategoria)
            setName('')
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao criar categoria de divida', error)
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
                onPress={handleCriarCategoriasDividas}
            />
        </SafeAreaView>

    );
}