import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('GenFinances_V2.db');
};

export const initDB = async () => {
    const db = await getDBConnection();
    try {
        // Tabela de listas
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS lists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            template TEXT CHECK(template IN ('Compras', 'Simples', 'Mensal')),
            dividas_id INTEGER,
            items_id INTEGER,
            FOREIGN KEY (dividas_id) REFERENCES dividas(id),
            FOREIGN KEY (items_id) REFERENCES items(id)
        );
        `);

        // Tabela de dividas
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dividas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            value REAL NOT NULL,
            date TEXT NOT NULL,
            category_id INTEGER,
            paymentType TEXT CHECK(paymentType IN ('Parcelado', 'Compra Única', 'Recorrente')),
            installments INTEGER DEFAULT 1,
            FOREIGN KEY (category_id) REFERENCES categorys_debts(id)
        );
        `);

        // Tabela de cataegorias (dividas)
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categorys_debts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );
        `);

        // Tabela de itens
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            value REAL NOT NULL,
            category_id INTEGER,
            FOREIGN KEY (category_id) REFERENCES categorys_items(id)
        );
        `);

        // Tabela de categorias (itens)
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categorys_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );
        `);

        console.log('Tabelas <lists.table>, <dividas.table>, <items.table>, <categorys_items.table> e <categorys_debts.table>,   criadas.');
    } catch (error) {
        console.error('Erro ao criar tabela (Func. initDB() => database.js)', error)
    }
};



// CRUD (CREATE)

export const createList = async (listConfig) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO lists (name, template, dividas_id, items_id) VALUES (?, ?, ?, ?)`,
            [listConfig.name, listConfig.template || 'Simples', listConfig.dividas_id || null, listConfig.items_id || null]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar lista (Func. createList() => database.js):', error)
    }
}

export const addDivida = async (divida) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO dividas (name, value, date, category_id, paymentType, installments) VALUES (?, ?, ?, ?, ?, ?)`,
            [divida.name, divida.value, divida.date, divida.category_id || null, divida.paymentType || 'Compra Única', divida.installments || 1]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar divida (Func. addDivida() => database.js):', error)
    }
};

export const addCategory = async (category) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO categorys_debts (name) VALUES (?)`,
            [category.categoryName]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar categoria (Func. addCategorys() => database.js):', error)
    }
};

// CRUD (READ)
export const getDivida = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`            
            SELECT 
                d.id, 
                d.name, 
                d.value, 
                d.date, 
                d.category_id,
                c.name AS category_name,  -- Nome da categoria
                d.paymentType, 
                d.installments
            FROM dividas d
            LEFT JOIN categorys_debts c ON d.category_id = c.id`
        );
        console.log('Dados de <dividas.table> carregados.')
        for (const row of allRows) {
            console.log(row.id, row.value, row.name, row.date, row.category_id, row.category_name, row.paymentType, row.installments);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar <dividas.table> (Func. getDivida() => database.js)', error)
    }
};

export const getCategorys = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM categorys_debts`);
        console.log('Dados de <categorys.table> carregados.')
        for (const row of allRows) {
            console.log(row.id, row.name);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao ler categorias (Func. getCategorys() => database.js)', error)
    }
};

export const getLists = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`
        SELECT
            l.id,
            l.name,
            l.template,
            l.dividas_id,
            l.items_id,
            d.name AS divida_name,
            d.value AS divida_value,
            d.date AS divida_date,
            d.category_id AS divida_category_id,
            d.paymentType AS divida_paymentType,
            d.installments AS divida_installments,
            i.name AS item_name,
            i.value AS item_value,
            i.category_id AS item_category_id
        FROM lists l
        LEFT JOIN dividas d ON l.dividas_id = d.id
        LEFT JOIN items i ON l.items_id = i.id
        `);
        console.log('Dados de <lists.table> carregados.');
        for (const row of allRows) {
            console.log(row.id, row.name);
        }
        return allRows;
    } catch(error) {
        console.error('Erro ao ler listas (Func. getLists() => database.js)', error);
        throw error; // Propagar o erro para tratamento superior
    }
};

// CRUD (UPDATE)

export const updateDivida = async (id, divida) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`UPDATE dividas SET name = ?, value= ?, date = ? WHERE id = ?`, [divida.name, divida.value, divida.date, id]);
        return true;
    } catch (error) {
        console.error('Erro ao atualizar', error)
        return false;
    }
}

export const updateList = async (id, list) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`UPDATE lists SET name = ?, template = ? WHERE id = ?`, [list.nameList, list.template, id]);
        return true;
    } catch (error) {
        console.error('Erro ao tentar atualizar lista (Func. updateList => database.js', error)
        return false;
    }
}

// CRUD (DELETE)

export const deleteDivida = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM dividas WHERE id = $id`, { $id: id });
        return true;
    } catch (error) {
        console.error('Erro ao tentar apagar divida (Func. deleteDivida => database.js):', error)
        return false;
    }

};

export const deleteList = async (id) => {
    try{
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM lists WHERE id = $id`, {$id: id });
        return true;
    }catch(error){
        console.error('Erro ao tentar apagar lista (Func. deleteList => database.js):', error)
        return false;
    }
}

// DELETE DATABASE (DONT USE IN CURRENT DATABASE => GenFinances_V1)
export const deleteDatabase = async () => {
    try {
        await SQLite.deleteDatabaseAsync('GenFinances_V1.db');
        console.log('Banco de dados deletado');
    } catch (error) {
        console.error('Erro ao deletar banco de dados:', error);
    }
};