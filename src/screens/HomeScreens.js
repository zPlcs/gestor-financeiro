import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { DividaContext } from '../process/DividaContext';

export default function HomePage() {
  const { dividas, loading, removeDivida } = useContext(DividaContext);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>Suas Dívidas</Text>
      
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