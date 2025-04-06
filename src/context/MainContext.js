import React, { createContext, useState, useEffect } from 'react';
import {
    initDB,
    addDivida,
    getDivida,
    deleteDivida,
    updateDivida,
    getCategorys,
    addCategory,
    deleteDatabase,
    createList,
    getLists
} from '../database/database'


export const MainContext = createContext();

export function MainProvider({ children }) {
    useEffect(() => {
        const loadData = async () => {
            await initDB();
            const listsFromDB = await getLists();
            const dividasFromDB = await getDivida();
            const categorysFromDB = await getCategorys();
            setCategorys(categorysFromDB);
            setDividas(dividasFromDB);
            setLists(listsFromDB);
        };
        loadData();
    }, []);

// CRUD (CREATE)
    const criarList = async (newList) => {
        try{
            await createList(newList);
            const updatedLists = await getLists();
            setLists(updatedLists);
        } catch(error){
            console.error('Falha ao criar lista (Func. criarList() => MainContext.js)', error)
        }
    }

// CRUD (READ)

// CRUD (UPDATE)

// (CRUD) (DELETE)

    const criarDivida = async (novaDivida) => {
        try {
            await addDivida(novaDivida);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch (error) {
            console.error('Falha ao criar divida (Func. criarDivida() => MainContext.js):', error);
        }
    };

    const deletarBanco = async () => {
        try {
            await deleteDatabase()
        } catch (error) {
            console.error('banco nãod deletado', error)
        }
    }

    const deletarDivida = async (id) => {
        try {
            await deleteDivida(id);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch (error) {
            console.error('Erro ao tentar excluir', error)
        }
    }

    const editarDivida = async (id, novosDados) => {
        try {
            await updateDivida(id, novosDados);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch (error) {
            console.error('Erro ao editar')
        }
    }

    const criarCategory = async (newCategory) => {
        try {
            await addCategory(newCategory);
            const updatedCategorys = await getCategorys();
            setCategorys(updatedCategorys);
        } catch (error) {
            console.error('Falha ao criar categoria (Func. criarCategory() => MainContext.js):', error);
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categorys.find(cat => cat.id === categoryId);
        return category ? category.name : "Sem categoria";
    };


    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());
    const [categoryName, setCategoryName] = useState('');
    const [categorys, setCategorys] = useState([]);
    const [dividas, setDividas] = useState([]);

    const [nameList, setNameList] = useState('');
    const [lists, setLists] = useState([]);

    function ClearFormDivida() {
        setName('');
        setValue(0);
        setDate(new Date());
    }

    function ClearFormCategoria() {
        setCategoryName('');
    }

    return (
        <MainContext.Provider value={{
            name, setName,
            value, setValue,
            date, setDate,
            categoryName, setCategoryName,
            criarDivida, deletarDivida, editarDivida,
            ClearFormDivida, ClearFormCategoria,
            dividas, setDividas,
            criarCategory, categorys,
            getCategoryName,
            deletarBanco,
            criarList,
            nameList, setNameList
        }}>
            {children}
        </MainContext.Provider>
    );
}