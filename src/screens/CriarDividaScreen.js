import React, { useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { DividaContext } from '../process/DividaContext';
import { dbService, initDB } from '../database/database';
import { useNavigation } from '@react-navigation/native';

export default function CriarDividaScreen() {
  const navigate = useNavigation();
  const {
    nome, setNome,
    descricao, setDescricao,
    valor, setValor,
    datadecompra, setDatadecompra,
    dividas, setDividas,
    clearForm
  } = useContext(DividaContext);

  const addDivida = async () => {
    if (!nome || !valor || !datadecompra) {
      alert('Nome, valor e data são obrigatórios!');
      return;
    }
    try {
      const novaDivida = { nome, descricao, valor, datadecompra };
      const id = await dbService.addDivida(novaDivida);
      setDividas([...dividas, { ...novaDivida, id }]);
      clearForm();
      navigate.goBack();
    } catch (error) {
      console.error('Erro ao adicionar dívida:', error);
      alert('Erro ao salvar dívida');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Cadastrar Nova Dívida</Text>
      
      <Text>Nome *</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholder="Ex: Cartão de Crédito"
      />

      <Text>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        placeholder="Ex: Compras do mês"
      />

      <Text>Valor *</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 150.50"
      />

      <Text>Data de Compra *</Text>
      <TextInput
        value={datadecompra}
        onChangeText={setDatadecompra}
        style={styles.input}
        placeholder="DD/MM/AAAA"
      />

      <Button 
        title="Salvar Dívida" 
        onPress={addDivida} 
      />
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  }
};