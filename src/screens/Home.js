import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { MainContext } from '../context/MainContext'
import DividaItem from '../components/DividaItem'

export default function Home() {
    const {
        dividas
    } = useContext(MainContext);

    return (
        <View>
            <Text>HomePage</Text>
            <FlatList
                data={dividas}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => <DividaItem item={item} />}
            />
        </View>
    );
}