import React, { useState, useContext } from 'react';
import { TextInput, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DividaContext } from '../process/DividaContext';

export default function CriarDividaScreen() {
  const { nome, setNome, descricao, setDescricao, valor, setValor, datadecompra, setDatadecompra, dividaList, setDividaList } = useContext(DividaContext);
  const navigate = useNavigation();

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
    navigate.goBack();
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
    </View>
  );
}
