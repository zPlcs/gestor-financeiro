import React, { useContext, useState } from 'react'
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native'
import { MainContext } from '../context/MainContext'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


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

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Garante 2 dígitos (ex.: 05)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0 (janeiro=0)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Ex.: "05/04/2025"
  };

  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paymentType, setPaymentType] = useState('Compra Única');
  const [installments, setInstallments] = useState('1');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showCalendar = () => {
    setShow(true);
  };

  const CriarDivida = async () => {
    try {
      const novaDivida = {
        name,
        value,
        date: formatDate(date),
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