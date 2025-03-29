import React, { useState, createContext, useEffect } from 'react'
import { createTable, addDivida, getDividas, updateDivida, deleteDivida } from '../database/database';

export const DividaContext = createContext();

export function DividaProvider({ children }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [datadecompra, setDatadecompra] = useState('');
    const [dividaList, setDividaList] = useState([]);

    return (
        <DividaContext.Provider value={{ nome, setNome, descricao, setDescricao, valor, setValor, datadecompra, setDatadecompra, dividaList, setDividaList }}>
            {children}
        </DividaContext.Provider>
    );

}