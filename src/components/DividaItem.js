import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ButtonEditar, ButtonApagar } from './Button'
import Style from '../style/style'
import { MainContext } from '../context/MainContext'

export default function DividaItem({ item }) {
    const { deletarDivida } = useContext(MainContext);

    const handleDelete = async () => {
        try{
            await deletarDivida(item.id);
        } catch(error) {
            console.error('erro ao deletar')
        }
    }
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
                <ButtonApagar onPress={handleDelete} />
            </View>
        </View>
    );
}
