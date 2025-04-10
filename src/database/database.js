import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('GenFinances_V1.db');
};

export const initDB = async () => {
    const db = await getDBConnection();
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS lists (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                template TEXT CHECK(template IN ('Compras', 'Simples', 'Mensal'))
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS debt (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                list_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                value REAL NOT NULL,
                date TEXT NOT NULL,
                category_id INTEGER NOT NULL,
                paymentType TEXT CHECK(paymentType IN ('Parcelado', 'Compra Única', 'Recorrente')),
                installments INTEGER DEFAULT 1,
                FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categorys_debts(id) ON DELETE SET NULL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS item (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                list_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                value REAL NOT NULL,
                category_id INTEGER NOT NULL,
                checked BOOLEAN DEFAULT 0,
                quantity INTEGER DEFAULT 1,
                FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categorys_items(id) ON DELETE SET NULL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS categorys_debts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS categorys_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            );
        `);

        console.log('Tabelas criadas');
    } catch (error) {
        console.error('Erro ao criar tabela (Func. initDB() => database.js)', error);
    }
};

// CRUD <LISTAS>
export const createList = async (list) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO lists (name, template) VALUES (?, ?)`,
            [list.name, list.template || 'Simples']
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar lista (Func. createList() => database.js)', error);
    }
};

export const getList = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`
            SELECT 
                id,
                name,
                template
            FROM lists
        `);
        console.log('Listas carregadas.');
        for (const row of allRows) {
            console.log(row.id, row.name, row.template);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar listas', error);
    }
};

export const updateList = async (id, list) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            UPDATE lists SET 
                name = ?, 
                template = ? 
            WHERE id = ?`,
            [list.nameList, list.template, id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao atualizar listas.', error);
    }
};

export const deleteList = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM lists WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao deletar lista.', error);
    }
};
// CRUD <LISTAS>

// CRUD <DIVIDAS>
export const createDebt = async (listId, debt) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            INSERT INTO debt (
                list_id,
                name,
                value,
                date,
                category_id,
                paymentType,
                installments
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                listId,
                debt.name,
                debt.value,
                debt.date,
                debt.category_id || null,
                debt.paymentType || 'Compra Única',
                debt.installments || 1
            ]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar divida.', error);
    }
};

export const getDebt = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`
            SELECT
                d.list_id,
                d.id,
                d.name,
                d.value,
                d.date,
                d.category_id,
                c.name AS category_name,
                d.paymentType,
                d.installments
            FROM debt d
            LEFT JOIN categorys_debts c ON d.category_id = c.id
        `);
        console.log('Dividas carregadas.');
        for (const row of allRows) {
            console.log(
                row.list_id,
                row.id,
                row.value,
                row.name,
                row.date,
                'categoria:',row.category_id,
                row.category_name,
                row.paymentType,
                row.installments
            );
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar dividas.', error);
    }
};

export const updateDebt = async (id, debt) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            UPDATE debt SET
                name = ?,
                value = ?,
                date = ?,
                category_id = ?,
                paymentType = ?,
                installments = ?
            WHERE id = ?`,
            [
                debt.name,
                debt.value,
                debt.date,
                debt.category_id,
                debt.paymentType,
                debt.installments,
                id
            ]
        );
    } catch (error) {
        console.error('Erro ao atualizar divida.', error);
    }
};

export const deleteDebt = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM debt WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao deletar divida', error);
    }
};
// CRUD <DIVIDAS>

// CRUD <ITENS>
export const createItem = async (item) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `
            INSERT INTO item (listId, name, value, category_id, checked, quantity) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [item.listId, item.name, item.value, item.category_id, item.checked, item.quantity]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar item', error);
    }
};

export const getItem = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM item`);
        console.log('Itens carregados.');
        for (const row of allRows) {
            console.log(row.id, row.listId, row.name, row.value, row.category_id, row.checked, row.quantity);
        }
    } catch (error) {
        console.error('Erro ao carregar itens', error);
    }
};

export const updateItem = async (id, item) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            UPDATE item SET
                name = ?,
                value = ?,
                category_id = ?,
                checked = ?,
                quantity = ?
            WHERE id = ?`,
            [item.name, item.value, item.category_id, item.checked, item.quantity, id]
        );
    } catch (error) {
        console.error('Erro ao atualizar item', error);
    }
};

export const deleteItem = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `
            DELETE FROM item WHERE id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao deletar item', error);
    }
};
// CRUD <ITENS>

// CRUD <CATEGORIAS - DIVIDAS>
export const createCategoryDebt = async (categoryDebt) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO categorys_debts (name) VALUES (?)`,
            [categoryDebt.name]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar categoria de dívida', error);
    }
};

export const getCategoryDebt = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM categorys_debts`);
        console.log('Categorias de dívidas carregadas.');
        for (const row of allRows) {
            console.log(row.id, row.name)
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar categorias de dívidas', error);
    }
};

export const updateCategoryDebt = async (id, categoryDebt) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `UPDATE categorys_debts SET name = ? WHERE id = ?`,
            [categoryDebt.name, id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao atualizar categoria de dívida', error);
    }
};

export const deleteCategoryDebt = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM categorys_debts WHERE id = ?`, [id]);
        return true;
    } catch (error) {
        console.error('Erro ao deletar categoria de dívida', error);
    }
};

// CRUD <CATEOGIRAS - DIVIDAS>

// CRUD <CATEGORIAS - ITENS>

export const createCategoryItem = async (categoryItem) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO categorys_items (name) VALUES (?)`,
            [categoryItem.name]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar categoria de item', error);
    }
};

export const getCategoryItem = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM categorys_items`);
        console.log('Categorias de itens carregadas.');

        return allRows;
    } catch (error) {
        console.error('Erro ao carregar categorias de itens', error);
    }
};

export const updateCategoryItem = async (id, categoryItem) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            `UPDATE categorys_items SET name = ? WHERE id = ?`,
            [categoryItem.name, id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao atualizar categoria de item', error);
    }
};

export const deleteCategoryItem = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM categorys_items WHERE id = ?`, [id]);
        return true;
    } catch (error) {
        console.error('Erro ao deletar categoria de item', error);
    }
};

// DELETE DATABASE (DONT USE IN CURRENT DATABASE => GenFinances_V5)
export const deleteDatabase = async () => {
    try {
        await SQLite.deleteDatabaseAsync('GenFinances_V5.db');
        console.log('Banco de dados deletado');
    } catch (error) {
        console.error('Erro ao deletar banco de dados:', error);
    }
};