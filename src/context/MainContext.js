import React, { createContext, useState, useEffect } from 'react';
import { initDB, addDivida, getDivida, deleteDivida, updateDivida, getCategorys, addCategory } from '../database/database'


export const MainContext = createContext();

export function MainProvider({ children }) {
    useEffect(() => {
        const loadData = async () => {
            await initDB();
            const dividasFromDB = await getDivida();
            const categorysFromDB = await getCategorys();
            setCategorys(categorysFromDB);
            setDividas(dividasFromDB);
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
            await deleteDivida(id);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch(error){
            console.error('Erro ao tentar excluir', error)
        }
    }

    const editarDivida = async (id, novosDados) => {
        try{
            await updateDivida(id, novosDados);
            const updatedDividas = await getDivida();
            setDividas(updatedDividas);
        } catch(error){
            console.error('Erro ao editar')
        }
    }

    const criarCategory = async (newCategory) => {
        try{
            await addCategory(newCategory);
            const updatedCategorys = await getCategorys();
            setCategorys(updatedCategorys);
        } catch(error) {
            console.error('Falha ao criar categoria (Func. criarCategory() => MainContext.js):', error);
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categorys.find(cat => cat.id === categoryId);
        return category ? category.name : "Sem categoria";
    };


    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState('');
    const [categoryName, setCategoryName]= useState('');
    const [categorys, setCategorys] = useState([]);
    const [dividas, setDividas] = useState([]);

    function ClearFormDivida(){
        setName('');
        setValue('');
        setDate('');
    }

    function ClearFormCategoria(){
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
            getCategoryName
        }}>
            {children}
        </MainContext.Provider>
    );
}