import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        return () => {
            ClearFormDivida();
        };
    }, []);

    const handleEditar = async () => {
        try {
            const updatedData = {
                name: name || dividaName,
                value: value || dividaValue,
                date: formatDate(date) || dividaDate
            }
            const hasChanged = name !== dividaName || value !== dividaValue || date !== dividaDate;

            if (hasChanged) {
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
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showCalendar = () => {
        setShow(true);
    };

    const formatDate = (date) => {
        // Se não for um objeto Date válido, retorne um valor padrão (ou trate o erro)
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return "Data inválida"; // Ou retorne uma data padrão: return "01/01/1970";
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
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