import react, { useState, useContext } from 'react'
import { SafeAreaView, Text, TextInput, Button, View, TouchableOpacity, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainContext } from '../../context/MainContext';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditarDivida() {
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
    const [date, setDate] = useState(new Date(previousDate));
    const [paymentType, setPaymentType] = useState(previousPaymentType || 'Compra Única');
    const [installments, setInstallments] = useState(previousInstallments || 0);
    const [selectedCategory, setSelectedCategory] = useState(previousCategory_id || null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // Mantém aberto no iOS, fecha no Android
        setDate(currentDate);
        setNewDate(currentDate)
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };



    const handleAtualizarDivida = async () => {
        try {
            const novaDivida = { name: name || previousName, value: parseFloat(value) || previousValue, date: newDate || previousDate, paymentType: paymentType || previousPaymentType, installments: paymentType === 'Parcelado' ? (parseInt(installments) || previousInstallments) : 1, category_id: selectedCategory || previousCategory_id }
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
                <Text>{newDate.toLocaleDateString()}</Text>
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

{/* 
    import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [divida, setDivida] = useState([]);
  const [dataDisplay, setDataDisplay] = useState('20/05/2025'); // Estado para controlar 

  const criarDivida = () => {
    const novaDivida = { id: new Date().toString(), name: name, date: dataDisplay };
    setDivida([...divida, novaDivida]);
    setDate(new Date()) // -> não vai mudar de novo, por que fecharia a página
    setName('')
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (currentDate) {
      setDate(currentDate);
      setDataDisplay(currentDate.toLocaleDateString()); // Atualiza o display quando o usuário seleciona
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const rend = ({ item }) => {
    return(
      <View>
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
      </View>
    );
  }

  const key = (p) => {
    return p.id
  }

  return (
    <SafeAreaView style={{ padding: 50 }}>
    <Text>Insira o nome:</Text>
    <TextInput 
    value={name}
    onChangeText={setName}
    />
    <Text>Insira a data:</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>{dataDisplay}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Button title='Submit' onPress={criarDivida}/>

      <FlatList 
      data={divida}
      keyExtractor={key}
      renderItem={rend}
      />
    </SafeAreaView>
  );
};

export default App;

    */}