import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, Button, TextInput, Platform, View, TouchableOpacity } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CriarDivida() {
    const navigation = useNavigation();

    const { criarDivida, categoryDebt } = useContext(MainContext)

    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());
    const [paymentType, setPaymentType] = useState('Compra Única');
    const [installments, setInstallments] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const handleCriarDivida = async () => {
        try {
            const novaDivida = { name: name, value: value, date: date.toLocaleDateString(), paymentType, installments, category_id: selectedCategory }
            await criarDivida(listId, novaDivida)
            setName('');
            setValue(0);
            setDate(new Date());
            setPaymentType('Compra Única');
            setInstallments(0);
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
            <Text>Data:</Text>
            <TouchableOpacity
                onPress={showDatepicker}
                style={{ padding: 15 }}
            >
                <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
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
            >
                <Picker.Item label="Compra Única" value="Compra Única" />
                <Picker.Item label="Parcelado" value="Parcelado" />
                <Picker.Item label="Recorrente" value="Recorrente" />
            </Picker>

            {paymentType === 'Parcelado' && (
                <View>
                    <Text>Número de Parcelas:</Text>
                    <TextInput
                        value={installments}
                        onChangeText={(text) => setInstallments(parseInt(text) || 0)}
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