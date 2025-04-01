import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { MainContext } from '../context/MainContext'

export default function Home() {
    const {
        dividas
    } = useContext(MainContext);
    
    const key = (p) => {
        return p.id;
    }

    const rend = ({ item }) => {
        return(
            <Text>
                {item.id} - {item.name} - {item.date}
            </Text>
        );
    }

    return (
        <View>
            <Text>HomePage</Text>
            <FlatList
            data={dividas}
            keyExtractor={key}
            renderItem={rend}
            />
        </View>
    );
}