import React, { useContext, useEffect, useState } from 'react'
import { TextInput, Text, Button, TouchableOpacity,SafeAreaView } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditarDivida() {
    const navigation = useNavigation();
    const route = useRoute();
    const {
        dividaID,
        dividaName,
        dividaValue,
        dividaDate
    } = route.params;
    const {
        name, setName,
        value, setValue,
        date, setDate,
        editarDivida,
        ClearFormDivida
    } = useContext(MainContext)

    useEffect(() => {
        const [day, month, year] = dividaDate.split('/');
        const originalDate = new Date(year, month - 1, day);

        // Inicializar os estados com os valores da dívida
        setName(dividaName);
        setValue(dividaValue);
        setDate(originalDate);
        return () => {
            ClearFormDivida();
        };
    }, []);

    const handleEditar = async () => {
        try {
            const updatedData = { name, value, date: formatDate(date) }
            if (name !== dividaName) {
                updatedData.name = name;
            }

            if (value !== dividaValue) {
                updatedData.value = value;
            }

            const currentFormattedDate = formatDate(date);
            if (currentFormattedDate !== dividaDate) {
                updatedData.date = currentFormattedDate;
            }

            if(name !== dividaName || value !== dividaValue || date !== dividaDate){
                await editarDivida(dividaID, updatedData); 
            }

            ClearFormDivida();
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar', error)
        }
    };
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;;
        setShow(false);
        setDate(currentDate);
    };

    const showCalendar = () => {
        setShow(true);
    };

    const formatDate = (dateObj) => {
        if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
            return dividaDate; // Retorna a data original se a nova for inválida
        }

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <SafeAreaView>
            <Text>{dividaID}</Text>
            <Text>{dividaName}</Text>
            <Text>{dividaValue}</Text>
            <Text>{dividaDate}</Text>
            <Text>Nome:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
            />
            <Text>Valor:</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
            />
            <Text>Data:</Text>
            <TouchableOpacity onPress={showCalendar}>
                <Text>{formatDate(date)}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    is24Hour={true}
                />
            )}
            <Button title='Salvar Dívida' onPress={handleEditar} />
        </SafeAreaView>
    );
}