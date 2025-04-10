import React, { useContext } from 'react'
import { SafeAreaView, Text, TextInput, Button, FlatList } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation } from '@react-navigation/native';
import RenderCategoriasDividas from './RenderCategoriasDividas';

export default function CategoriasDividas() {
    const navigation = useNavigation();
    const { categoryDebt } = useContext(MainContext)

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
                data={categoryDebt}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => <RenderCategoriasDividas item={item} />}
            />
        </SafeAreaView>

    );
}