import React, { useContext, useState } from 'react'
import { View, TextInput, Text, Button } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function CriarDivida() {
    const navigation = useNavigation();
    const {
        name, setName,
        value, setValue,
        date, setDate,
        categorys,
        criarDivida,
        ClearFormDivida,
    } = useContext(MainContext);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [paymentType, setPaymentType] = useState('Compra Única');
    const [installments, setInstallments] = useState('1');

    const CriarDivida = async () => {
        try {
            const novaDivida = {
                name,
                value,
                date,
                category_id: selectedCategory,
                paymentType,
                installments: paymentType === 'Parcelado' ? parseInt(installments) : 1
            };
            await criarDivida(novaDivida);
            ClearFormDivida();
            navigation.goBack();
        } catch (error) {
            console.error("Falha ao criar dívida (Func. CriarDivida() => CriarDivida.js):", error);
        }
    }
    return (
        <SafeAreaView>
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
            <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="DD/MM/AAAA"
            />

            <Text>Categoria:</Text>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
                <Picker.Item label="Sem categoria" value={null} />
                {categorys.map(cat => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
            </Picker>

            <Text>Tipo de Pagamento:</Text>
            <Picker
                selectedValue={paymentType}
                onValueChange={(itemValue) => setPaymentType(itemValue)}>
                <Picker.Item label="Compra Única" value="Compra Única" />
                <Picker.Item label="Parcelado" value="Parcelado" />
                <Picker.Item label="Recorrente" value="Recorrente" />
            </Picker>

            {paymentType === 'Parcelado' && (
                <>
                    <Text>Número de Parcelas:</Text>
                    <TextInput
                        value={installments}
                        onChangeText={setInstallments}
                        keyboardType="numeric"
                        placeholder="1"
                    />
                </>
            )}
            <Button title='Salvar Dívida' onPress={CriarDivida} />
        </SafeAreaView>
    );
}

{/* Página de criar divida com o selecionador de datas criado. (Necessário integrar no sistema inteiro, tendo a sua base também alterada.)


import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [list, setList] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showCalendar = () => {
    setShow(true);
  };

  const CriarLista = () => {
    const newList = {
      id: new Date().getTime().toString(),
      name: name,
      value: value,
      date: date.toLocaleDateString(),
    };
    setList([...list, newList]);
    setValue('');
    setName('');
    setDate(new Date());
  };

  const key = (p) => {
    return p.id;
  };

  const rend = ({ item }) => {
    return (
      <View>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.value}</Text>
        <Text>{item.date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View>
        <Text>Nome:</Text>
        <TextInput style={Style.input} value={name} onChangeText={setName} />
      </View>
      <View>
        <Text>Valor:</Text>
        <TextInput style={Style.input} value={value} onChangeText={setValue} />
      </View>
      <View>
        <Text>Data:</Text>
        <TouchableOpacity onPress={showCalendar} style={Style.input}>
          <Text>{date.toLocaleDateString()}</Text>
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
      </View>
      <Button title="Criar Lista" onPress={CriarLista} />
      <FlatList data={list} keyExtractor={key} renderItem={rend} />
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  input: {
    padding: 20,
  },
});

    */}