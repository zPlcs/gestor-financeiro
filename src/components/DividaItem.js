import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ButtonEditar, ButtonApagar } from './Button'
import Style from '../style/style'
import { MainContext } from '../context/MainContext'
import { useNavigation } from '@react-navigation/native';

export default function DividaItem({ item }) {
    const navigation = useNavigation();
    const { deletarDivida, getCategoryName } = useContext(MainContext);

    const handleDelete = async () => {
        try {
            await deletarDivida(item.id);
        } catch (error) {
            console.error('erro ao deletar')
        }
    }

    const handleEditar = () => {
        navigation.navigate('EditDivida', {
            dividaID: item.id,
            dividaName: item.name,
            dividaValue: item.value,
            dividaDate: item.date
        });
    }

    const HandleParcela = () =>{
        if(item.paymentType === 'Parcelado'){
            return (<Text style={Style.infoText}>Data de ultima parcela:</Text>);
        } else {
            return null
        }
    }

    return (
        <View style={Style.container}>
            <View style={Style.list}>
                <Text style={Style.mainText}>Divida: {item.name}</Text>
                <Text style={Style.infoText}>Valor: {item.value}</Text>
                <Text style={Style.infoText}>Data: {item.date}</Text>
                <Text style={Style.infoText}>Categoria: {getCategoryName(item.category_id)}</Text>
                <Text style={Style.infoText}>Tipo de dívida: {item.paymentType}</Text>
                <Text style={Style.infoText}>Número de parcelas: {item.installments}</Text>
                <HandleParcela />
            </View>
            <View style={Style.navButton}>
                <ButtonEditar onPress={handleEditar} />
                <ButtonApagar onPress={handleDelete} />
            </View>
        </View>
    );
}
