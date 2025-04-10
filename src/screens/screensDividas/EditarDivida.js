import react, { useState, useContext, useEffect } from 'react'
import { SafeAreaView, Text, TextInput, Button, View, TouchableOpacity, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditarDivida() {
    useEffect(() => {
        setDataDisplay(previousDate);
        console.log('Carregou')
    }, [])


    const navigation = useNavigation();
    const { atualizarDivida, categoryDebt } = useContext(MainContext);

    const route = useRoute();
    const {
        list_id,
        previousId,
        previousName,
        previousValue,
        previousDate,
        previousPaymentType,
        previousInstallments,
        previousCategory_id,
    } = route.params;

    const [name, setName] = useState(previousName);
    const [value, setValue] = useState(previousValue.toString());
    const [date, setDate] = useState(new Date());
    const [paymentType, setPaymentType] = useState(previousPaymentType || 'Compra Única');
    const [installments, setInstallments] = useState(previousInstallments || 0);
    const [selectedCategory, setSelectedCategory] = useState(previousCategory_id || null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dataDisplay, setDataDisplay] = useState(previousDate); // Estado para controlar


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(Platform.OS === 'ios'); // Mantém aberto no iOS, fecha no Android
        if (currentDate) {
            setDate(currentDate);
            setDataDisplay(currentDate.toLocaleDateString()); // Atualiza o display quando o usuário seleciona
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };


    const handleAtualizarDivida = async () => {
        try {
            const novaDivida = { name: name || previousName, value: parseFloat(value) || previousValue, date: dataDisplay || previousDate, paymentType: paymentType || previousPaymentType, installments: paymentType === 'Parcelado' ? (parseInt(installments) || previousInstallments) : 1, category_id: selectedCategory || previousCategory_id }
            await atualizarDivida(previousId, novaDivida);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar divida', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Dividas {list_id}</Text>
            <Text>Nome:</Text>
            <TextInput value={name} onChangeText={setName} placeholder={previousName} />
            <Text>Value:</Text>
            <TextInput value={value} onChangeText={setValue} placeholder={previousValue.toString()} />
            <Text>Data:</Text>
            <TouchableOpacity
                onPress={showDatepicker}
            >
                <Text>{dataDisplay}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}  // Agora usando a data correta
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
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
                        onChangeText={(text) => setInstallments(parseInt(text) || 0)}
                    />
                </View>
            )}
            <Button
                title='Criar Divida'
                onPress={handleAtualizarDivida}
            />
        </SafeAreaView>
    );
}

