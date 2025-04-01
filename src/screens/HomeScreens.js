import React, { useContext } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import { DividaContext } from '../process/DividaContext';

export default function HomePage() {
  const {
    loading,
    removeDivida,
    updateDivida,
    editingId, setEditingId,
    nome, setNome,
    descricao, setDescricao,
    valor, setValor,
    datadecompra, setDatadecompra,
    dividas,
    clearForm
  } = useContext(DividaContext);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  const startEditing = (divida) => {
    setEditingId(divida.id);
    setNome(divida.nome);
    setDescricao(divida.descricao || '');
    setValor(divida.valor.toString());
    setDatadecompra(divida.datadecompra);
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>Suas Dívidas</Text>

      {editingId && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Editando Dívida</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição (opcional)"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Data (YYYY-MM-DD)"
            value={datadecompra}
            onChangeText={setDatadecompra}
          />
          <Button
            title="Salvar Alterações"
            onPress={() => updateDivida(editingId)}
            color="green"
          />
          <Button
            title="Cancelar"
            onPress={() => {
              clearForm();
              setEditingId(null);
            }}
            color="gray"
          />
        </View>
      )}

      {dividas.length === 0 ? (
        <Text>Nenhuma dívida cadastrada</Text>
      ) : (
        <FlatList
          data={dividas}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>Valor: R$ {item.valor}</Text>
              <Text>Data: {item.datadecompra}</Text>
              {item.descricao && <Text>Descrição: {item.descricao}</Text>}
              <Button
                title="Editar"
                onPress={() => startEditing(item)}
                color="blue"
              />
              <Button
                title="Remover"
                onPress={() => removeDivida(item.id)}
                color="red"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = {
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16
  }
};