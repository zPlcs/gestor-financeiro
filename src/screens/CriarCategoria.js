import React, { useContext } from 'react'
import { TextInput, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CriarCategoria() {
    const navigation = useNavigation();
    const {
        categoryName, setCategoryName,
        ClearFormCategoria,
        criarCategory
    } = useContext(MainContext);

    const CriarCategoria = async () => {
        try {
            const newCategory = { categoryName };
            await criarCategory(newCategory);
            ClearFormCategoria();
            navigation.goBack();
        } catch (error) {
            console.error("Falha ao criar categoria (Func. CriarCategory() => CriarCategoria.js):", error);
        }
    }
    return (
        <SafeAreaView>
            <Text>Nome:</Text>
            <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
            />
            <Button title='Salvar Categoria' onPress={CriarCategoria} />
        </SafeAreaView>
    );
}

