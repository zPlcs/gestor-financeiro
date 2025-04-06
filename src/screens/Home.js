import React, { useContext } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import DividaItem from '../components/DividaItem'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const navigation = useNavigation();

    const navCriarCategoria = () => {
        navigation.navigate('CriarCategoria')
    }

    const navCriarDivida = () => {
        navigation.navigate('CriarDivida')
    }

    const navCriarLista = () => {
        navigation.navigate('CriarLista')
    }
    const {
        dividas, deletarBanco
    } = useContext(MainContext);

    return (
        <SafeAreaView>
            <HomeHeader />
            <Button title='Criar Categoria (divida)' onPress={navCriarCategoria}/>
            <Button title='Criar Categoria (lista)' onPress={() => {}}/>
            <Button title='Criar Divida' onPress={navCriarDivida}/>
            <Button title='Criar Lista' onPress={navCriarLista}/>
            <Button title='Criar Item' onPress={() => {}}/>
            {/* ONLY USE TO DELETE DE DATABASE <Button title='Deletar banco' onPress={deletarBanco}/> */}
            <Text>HomePage</Text>
            <FlatList
                data={dividas}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => <DividaItem item={item} />}
            />
        </SafeAreaView>
    );
}