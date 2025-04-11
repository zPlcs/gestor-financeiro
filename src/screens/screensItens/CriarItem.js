import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, Button, TextInput } from 'react-native'
import { MainContext } from '../../context/MainContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function CriarDivida() {
    const navigation = useNavigation();

    const { criarItem, categoryItem } = useContext(MainContext)

    const route = useRoute();
    const {
        listId,
        listName,
    } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleCriarItem = async () => {
        try {
            const novoItem = { name: name, value: value, quantity: quantity, checked, category_id: selectedCategory }
            await criarItem(listId, novoItem)
            setName('');
            setValue(0);
            setQuantity(1);
            setSelectedCategory(null);
            navigation.goBack()
        } catch (error) {
            console.error('Erro ao criar divida', error)
        }
    }

    return (
        <SafeAreaView>
            <Text>Dividas {listId} - {listName}</Text>
            <Text>Nome:</Text>
            <TextInput value={name} onChangeText={setName} />
            <Text>Value:</Text>
            <TextInput value={value} onChangeText={setValue} />
            <Text>Quantidade:</Text>
            <TextInput value={quantity} onChangeText={setQuantity} />
            <Text>Categoria:</Text>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
                <Picker.Item label="Selecione uma categoria" value={null} />
                {categoryItem.map(category => (
                    <Picker.Item
                        key={category.id}
                        label={category.name}
                        value={category.id}
                    />
                ))}
            </Picker>
            <Button
                title='Criar Divida'
                onPress={handleCriarItem}
            />
        </SafeAreaView>
    );
}