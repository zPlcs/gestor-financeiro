import React, { createContext, useState, useEffect } from 'react';
import { initDB, addDivida, getDivida } from '../database/database'


export const MainContext = createContext();

export function MainProvider({ children }) {
    useEffect(() => {
        const loadData = async () => {
            await initDB();
            const dividasFromDB = await getDivida();
            setDividas(dividasFromDB);
            setDividaListTeste(dividasFromDB);
        };
        loadData();
    }, []);

    const criarDivida = async (novaDivida) => {
        try{
            await addDivida(novaDivida);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch(error) {
            console.error('Falaha ao criar divida:', error);
        }
    };

    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState('');
    const [dividas, setDividas] = useState([]);
    const [dividaList, setDividaList] = useState([])
    const [dividaListTeste, setDividaListTeste] = useState([])

    function ClearForm(){
        setName('');
        setValue('');
        setDate('');
    }

    return (
        <MainContext.Provider value={{
            name, setName,
            value, setValue,
            date, setDate,
            dividaList, setDividaList,
            criarDivida,
            ClearForm,
            dividaListTeste, setDividaListTeste
            
        }}>
            {children}
        </MainContext.Provider>
    );
}