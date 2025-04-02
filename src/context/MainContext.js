import React, { createContext, useState, useEffect } from 'react';
import { initDB, addDivida, getDivida, deleteDivida } from '../database/database'


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
            console.error('Falha ao criar divida (Func. criarDivida() => MainContext.js):', error);
        }
    };

    const deletarDivida = async (id) =>{
        try{
            await await deleteDivida(id); // Chama a função do banco diretamente
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch(error){
            console.error('Erro ao tentar excluir', error)
        }
    }



    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState('');
    const [dividas, setDividas] = useState([]);

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
            criarDivida,
            ClearForm,
            dividas, setDividas,
            deletarDivida
        }}>
            {children}
        </MainContext.Provider>
    );
}