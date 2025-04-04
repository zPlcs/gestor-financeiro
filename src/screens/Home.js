import React, { useContext } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import DividaItem from '../components/DividaItem'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const nav = () => {
        navigation.navigate('CriarCategoria')
    }
    
    const {
        dividas
    } = useContext(MainContext);

    return (
        <SafeAreaView>
            <HomeHeader />
            <Button title='Go to Criar Categoria' onPress={nav}/>
            <Text>HomePage</Text>

            <FlatList
                data={dividas}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => <DividaItem item={item} />}
            />
        </SafeAreaView>
    );
}