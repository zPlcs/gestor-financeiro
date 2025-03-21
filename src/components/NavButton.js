import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

export default function NavButtom(props){
    return(
        <View style={Style.container}>
        <TouchableOpacity onPress={props.func}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
        </View>
    );
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignaitems:'center',
    },
    
    button:{
        borderWidth: 1,
        borderColor: 'black'
    },
})