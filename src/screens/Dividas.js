import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, Button, TextInput } from 'react-native'
import { MainContext } from '../context/MainContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Dividas() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());
    const [paymentType, setPaymentType] = useState('Compra Única');
    const [installments, setInstallments] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { criarDivida, categoryDebt, divida, setDivida } = useContext(MainContext)

    const handleCriarDivida = async () => {
        try {
            const novaDivida = { listId, name, value, date, paymentType, installments, category_id: selectedCategory }
            await criarDivida(listId, novaDivida)
            setName('');
            setValue(0);
            setDate(new Date());
            setPaymentType('Compra Única');
            setInstallments(1);
            setSelectedCategory(null);
            navigation.goBack()
        } catch (error) {
            console.error('Erro ao criar divida', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Dividas {listId} - {listName}</Text>
            <Text>Nome:</Text>
            <TextInput value={name} onChangeText={setName} />
            <Text>Value:</Text>
            <TextInput value={value} onChangeText={setValue} />
            <Text>Categoria:</Text>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
                <Picker.Item label="Selecione uma categoria" value={null} />
                {categoryDebt.map(category => (
                    <Picker.Item
                        key={category.id}
                        label={category.name}
                        value={category.id}
                    />
                ))}
            </Picker>

            <Text>Tipo de Pagamento:</Text>
            <Picker
                selectedValue={paymentType}
                onValueChange={setPaymentType}
                style={{ marginBottom: 16 }}
            >
                <Picker.Item label="Compra Única" value="Compra Única" />
                <Picker.Item label="Parcelado" value="Parcelado" />
                <Picker.Item label="Recorrente" value="Recorrente" />
            </Picker>

            {paymentType === 'Parcelado' && (
                <View>
                    <Text>Número de Parcelas:</Text>
                    <TextInput
                        value={installments.toString()}
                        onChangeText={(text) => setInstallments(parseInt(text) || 1)}
                    />
                </View>
            )}
            <Button
                title='Criar Divida'
                onPress={handleCriarDivida}
            />
        </SafeAreaView>
    );
}

