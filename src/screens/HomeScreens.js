import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { DividaContext } from '../process/DividaContext';

import Style from '../style/style'

export default function Home() {
  const { dividaList } = useContext(DividaContext);

  return (
    <View style={Style.mainHome}>
      <Text style={Style.mainTextHome}>Lista de Dívidas</Text>
      {dividaList && dividaList.length > 0 ? (
        dividaList.map((item, index) => (
          <Text key={index}>
            {item.nome} - R$ {item.valor}
          </Text>
        ))
      ) : (
        <Text>Não há dívidas cadastradas.</Text>
      )}
    </View>
  );
}
