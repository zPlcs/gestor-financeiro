import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonEditar, ButtonApagar } from './Button'

export default function DividaItem({ item }) {
    return (
        <View style={Style.container}>
            <View style={Style.list}>
                <Text style={Style.mainText}>Divida: {item.name}</Text>
                <Text style={Style.infoText}>Tipo: {item.type}</Text>
                <Text style={Style.infoText}>Valor: {item.value}</Text>
                <Text style={Style.infoText}>Data: {item.date}</Text>
                <Text style={Style.infoText}>Data de ultima parcela:</Text>
            </View>
            <View style={Style.navButton}>
                <ButtonEditar onPress={() => console.log('Editar pressionado', item.id)} />
                <ButtonApagar onPress={() => console.log('Apagar pressionado', item.id)} />
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    navButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: '#f8f8f8',
        margin: 20,
        padding: 20,
        borderColor: '#afafaf',
        borderWidth: 1,
        borderRadius: 10,
    },

    mainText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    infoText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

{/*
    Método:
    
      const key = (p) => {
    return p.id;
  }


  return(
    <View>
      <Text>Divida List</Text>
      <FlatList
        data={data}
        keyExtractor={key}
        renderItem={DividaItem}
      />
    </View>
  );
}
    */}
