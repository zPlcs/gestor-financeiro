import React, {useContext} from 'react'
import { SafeAreaView, Text, button } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConfigurarListasCompras(){
    return(
        <SafeAreaView>
            <Text>Confirgurar Lista Compras</Text>
        </SafeAreaView>
    );
}