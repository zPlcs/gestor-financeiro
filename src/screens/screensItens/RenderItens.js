import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation } from '@react-navigation/native';

export default function RenderItens({ item }) {

    if (!item) {
        return <Text>Carregando item...</Text>;
    }

    const navigation = useNavigation()
    const { deletarDivida, categoryDebt } = useContext(MainContext)

    const category = categoryDebt?.find(cate => cate.id === item.category_id) || { name: 'Sem categoria' }

    const handleAtualizarDivida = () => {
        navigation.navigate('EditarDivida', {
            list_id: item.list_id,
            previousId: item.id,
            previousName: item.name,
            previousValue: item.value,
            previousDate: item.date,
            previousPaymentType: item.paymentType,
            previousInstallments: item.installments,
            previousCategory_id: item.category_id
        })
    }

    const handleDeletarDivida = async () => {
        try {
            await deletarDivida(item.id)
        } catch (error) {
            console.error('Erro ao deletar dívida', error)
        }
    }
    return (
        <View style={{ padding: 20 }}>
            <Text>{item.name}</Text>
            <Text>{item.value}</Text>
            <Text>{item.date}</Text>
            <Text>{item.paymentType}</Text>
            {item.paymentType === 'Compra Única' || item.paymentType === 'Recorrente'
                ? null
                : <Text>{item.installments}</Text>}
            <Text>{category.name}</Text>
            <Button onPress={handleAtualizarDivida} title='Editar Divida' />
            <Button onPress={handleDeletarDivida} title='Apagar Divda' />
        </View>
    );
}