import React, { createContext, useState, useEffect } from 'react';
import {
    //DATABASE
    deleteDatabase,
    initDB,

    //LISTAS
    createList,
    getList,
    updateList,
    deleteList,

    //DIVIDAS
    createDebt,
    getDebt,
    updateDebt,
    deleteDebt,

    //ITENS
    createItem,
    getItem,
    updateItem,
    deleteItem,

    //CATEGORIAS - DIVIDAS
    createCategoryDebt,
    getCategoryDebt,
    updateCategoryDebt,
    deleteCategoryDebt,

    //CATEGORIAS - ITENS
    createCategoryItem,
    getCategoryItem,
    updateCategoryItem,
    deleteCategoryItem,

} from '../database/database'


export const MainContext = createContext();

export function MainProvider({ children }) {
    useEffect(() => {
        const loadData = async () => {
            await initDB();

            const listsFromDB = await getList();
            const debtsFromDB = await getDebt();
            const itemsFromDB = await getItem();
            const categorysDebtFromDB = await getCategoryDebt();
            const categorysItemFromDB = await getCategoryItem();

            setList(listsFromDB);
            setDebt(debtsFromDB);
            setItem(itemsFromDB);
            setCategorysDebtFromDB(categorysDebtFromDB);
            setCategorysItemFromDB(categorysItemFromDB);
        };
        loadData();
    }, []);

    // ESTADOS
    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(new Date());

    // ARRAYS
    const [list, setList] = useState([]);
    const [divida, setDivida] = useState([]);
    const [item, setItem] = useState([]);
    const [categoryDebt, setCategoryDebt] = useState([]);
    const [categoryItem, setCategoryItem] = useState([]);

    // CRUD LISTAS

    const criarLista = async (novaLista) => {
        try {
            await createList(novaLista);
            const listaAtualizada = await getList();
            setList(listaAtualizada);
        } catch (error) {
            console.error('Erro ao criar lista', error)
        }
    }

    const atualizarLista = async (id, novaLista) => {
        try {
            await updateList(id, novaLista);
            const listaAtualizada = await getList();
            setList(listaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar lista', error)
        }
    }

    const deletarLista = async (id) => {
        try {
            await deleteList(id);
            const listaAtualizada = await getList();
            setList(listaAtualizada);
        } catch (error) {
            console.error('Erro ao deletar lista', error)
        }
    }

    // CRUD LISTAS

    // CRUD DIVIDAS

    const criarDivida = async (listaId, novaDivida) => {
        try {
            await createDivida(listaId, novaDivida);
            const dividaAtualizada = getDebt();
            setDivida(dividaAtualizada);
        } catch (error) {
            console.error('Erro ao criar divida', error)
        }
    }

    const atualizarDivida = async (id, novaDivida) => {
        try {
            await updateDebt(id, novaDivida);
            const dividaAtualizada = getDebt();
            setDivida(dividaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar a divida', error)
        }
    }

    const deletarDivida = async (id) => {
        try {
            await deleteDebt(id);
            const dividaAtualizada = getDebt();
            setDivida(dividaAtualizada)
        } catch (error) {
            console.error('Erro ao deletar a divida', error)
        }
    }

    // CRUD DIVIDAS

    // CRUD ITENS

    const criarItem = async (listaId, novoItem) => {
        try {
            await createItem(listaId, novoItem);
            const itemAtualizado = getItem();
            setItem(itemAtualizado)
        } catch (error) {
            console.error('Erro ao criar item', error)
        }
    }

    const atualizarItem = async (id, novoItem) => {
        try {
            await updateItem(id, novoItem);
            const itemAtualizado = getItem();
            setItem(itemAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar item', error)
        }
    }

    const deletarItem = async (id) => {
        try {
            await deleteItem(id);
            const itemAtualizado = getItem();
            setItem(itemAtualizado);
        } catch (error) {
            console.error('Erro ao deletar item', error)
        }
    }

    // CRUD ITENS

    // CRUD CATEGORIAS (DIVIDAS)

    const criarCategoriaDivida = async (dividaId, novaCategoriaDivida) => {
        try {
            await createCategoryDebt(dividaId, novaCategoriaDivida);
            const categoriaDividaAtualizada = getCategoryDebt();
            setCategoryDebt(categoriaDividaAtualizada)
        } catch (error) {
            console.error('Erro ao criar categoria de divida', error)
        }
    }

    const atualizarCategoriaDivida = async (id, novaCategoriaDivida) => {
        try {
            await updateCategoryDebt(id, novaCategoriaDivida);
            const categoriaDividaAtualizada = getCategoryDebt();
            setCategoryDebt(categoriaDividaAtualizada)
        } catch (error) {
            console.error('Erro ao atualizar categoria de divida', error)
        }
    }

    const deletarCategoriaDivida = async (id) => {
        try {
            await deleteCategoryDebt(id);
            const categoriaDividaAtualizada = getCategoryDebt();
            setCategoryDebt(categoriaDividaAtualizada)
        } catch (error) {
            console.error('Erro ao deletar categoria de divida', error)
        }
    }

    // CRUD CATEGORIAS (DIVIDAS)

    // CRUD CATEGORIAS (ITENS)

    const criarCategoriaItem = async (dividaId, novaCategoriaItem) => {
        try {
            await createCategoryItem(dividaId, novaCategoriaItem);
            const categoriaItemAtualizada = getCategoryItem();
            setCategoryItem(categoriaItemAtualizada)
        } catch (error) {
            console.error('Erro ao criar categoria do item', error)
        }
    }

    const atualizarCategoriaItem = async (id, novaCategoriaItem) => {
        try {
            await updateCategoryItem(id, novaCategoriaItem);
            const categoriaItemAtualizada = getCategoryItem();
            setCategoryItem(categoriaItemAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar categoria do item', error)
        }
    }

    const deletarCategoriaItem = async (id) => {
        try {
            await deleteCategoryItem(id);
            const categoriaItemAtualizada = getCategoryItem();
            setCategoryItem(categoriaItemAtualizada);
        } catch (error) {
            console.error('Erro ao deletar categoria do item', error)
        }
    }

    // CRUD DB

    const deletarBD = async () => {
        try {
            await deleteDatabase()
        } catch (error) {
            console.error('banco não deletado', error)
        }
    }

    // CRUD DB

    // FUNÇÕES

    function LimparFormLista() {
        setName('');
    }

    function LimparFormDivida() {
        setName('');
        setValue(0);
        setDate(new Date());
    }

    function LimparFormItem() {
        setName('');
        setValue(0);
    }

    function LimparFormCategoriaDivida() {
        setCategoryDivida('');
    }

    function LimparFormCategoriaItem() {
        setCategoryItem('');
    }

    // FUNÇÕES

    return (
        <MainContext.Provider value={{
            // CRUD LISTAS
            criarLista,
            atualizarLista,
            deletarLista,

            // CRUD DIVIDAS
            criarDivida,
            atualizarDivida,
            deletarDivida,

            // CRUD ITENS
            criarItem,
            atualizarItem,
            deletarItem,

            //CRUD CATEGORIAS > DIVIDAS
            criarCategoriaDivida,
            atualizarCategoriaDivida,
            deletarCategoriaDivida,

            // CRUD CATEGORIAS > ITENS
            criarCategoriaItem,
            atualizarCategoriaItem,
            deletarCategoriaItem,

            // CRUD DATABASE
            deletarBD,

            // FUNÇÕES
            LimparFormLista,
            LimparFormDivida,
            LimparFormItem,
            LimparFormCategoriaDivida,
            LimparFormCategoriaItem,

            // ESTADOS
            name, setName,
            value, setValue,
            date, setDate,

            // ARRAYS
            list, setList,
            divida, setDivida,
            item, setItem,
            categoryDebt, setCategoryDebt,
            categoryItem, setCategoryItem
        }}>
            {children}
        </MainContext.Provider>
    );
}