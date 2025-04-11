import React, { useContext } from 'react'
import { SafeAreaView, Text, TextInput, Button, FlatList } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation } from '@react-navigation/native';
import RenderCategoriasItens from './RenderCategoriasItens';

export default function CategoriasDividas() {
    const navigation = useNavigation();
    const { categoryItem } = useContext(MainContext)

    const handleCriarCategoriaDivida = () => {
        navigation.navigate('CriarCategoriaDivida')
    }

    return (
        <SafeAreaView>
            <Text>Categorias Dividas</Text>
            <Button
                title='Criar Categoria'
                onPress={handleCriarCategoriaDivida}
            />

            <FlatList
                data={categoryItem}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => <RenderCategoriasItens item={item} />}
            />
        </SafeAreaView>

    );
}