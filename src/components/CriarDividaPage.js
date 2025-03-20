import React, { useState } from 'react';
import { TextInput, Text, View, Button } from 'react-native';

export default function CriarDividaPage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [datadecompra, setDatadecompra] = useState('');
  const [dividaList, setDividaList] = useState([]);

  const CriarDivida = () => {
    const novaDivida = {
      nome,
      descricao,
      valor,
      datadecompra,
    };

    setDividaList([...dividaList, novaDivida]);

    setNome('');
    setDescricao('');
    setValor('');
    setDatadecompra('');
  };

  return (
    <View>
      <Text>Insira os dados da sua dívida</Text>
      <Text>Nome</Text>
      <TextInput 
        value={nome}
        onChangeText={setNome}
      />

      <Text>Descrição</Text>
      <TextInput 
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text>Valor</Text>
      <TextInput 
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Text>Data de Compra</Text>
      <TextInput 
        value={datadecompra}
        onChangeText={setDatadecompra}
      />

      <Button title="Criar dívida" onPress={CriarDivida} />

      {dividaList.map((item, index) => (
        <Text key={index}>{item.nome} - R$ {item.valor}</Text>
      ))}
    </View>
  );
}
