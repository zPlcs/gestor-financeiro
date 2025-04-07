import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('GenFinances_V2.db');
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
                category_id INTEGER,
                paymentType TEXT CHECK(paymentType IN ('Parcelado', 'Compra Única', 'Recorrente')),
                installments INTEGER DEFAULT 1,
                FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categorys_debts(id) ON DELETE SET NULL
            );
            `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                list_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                value REAL NOT NULL,
                category_id INTEGER,
                checked BOOLEAN DEFAULT 0,
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
        console.error('Erro ao criar tabela (Func. initDB() => database.js)', error)
    }
};

// CRUD <LISTAS>

export const createList = async (list) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO lists (name, template) VALUES (?, ?)`, [list.name, list.template || 'Simples']
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar lista (Func. createList() => database.js', error)
    }
}

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
        console.error('Erro ao carregar listas', error)
    }
}

export const updateList = async (id, list) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`
        UPDATE lists SET 
            name = ?, 
            template = ? 
            WHERE id = ?`,
            [list.nameList, list.template, id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao atualizar listas.', error)
    }
}

export const deleteList = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`
        DELETE FROM lists WHERE
         id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao deletar lista.', error)
    }
}

// CRUD <LISTAS>

// CRUD <DIVIDAS>

export const createDebt = async (listId, debt) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO debt (
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
        console.error('Erro ao criar divida.', error)
    }
}

export const getDebt = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`
        SELECT
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
        `)
        console.log('Dividas carregadas.')
        for (const row of allRows) {
            console.log(row.id, row.value, row.name, row.date, row.category_id, row.category_name, row.paymentType, row.installments);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar dividas.', error)
    }
}

export const updateDebt = async (id, debt) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`
        UPDATE debt SET
            name = ?,
            value = ?,
            date = ?,
            category_id = ?,
            paymentType = ?,
            installments = ?
        WHERE id = ?
        `, [
            debt.name,
            debt.value,
            debt.date,
            debt.category_id,
            debt.paymentType,
            debt.installments,
            id
        ])
    } catch (error) {
        console.error('Erro ao atualizar divida.', error)
    }
}

export const deleteDebt = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`
        DELETE FROM debt WHERE
         id = ?`,
            [id]
        );
        return true;
    } catch (error) {
        console.error('Erro ao deletar divida', error)
    }
}

// CRUD <DIVIDAS>


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

// CRUD (UPDATE)

export const updateDivida = async (id, divida) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`UPDATE debt SET name = ?, value= ?, date = ? WHERE id = ?`, [divida.name, divida.value, divida.date, id]);
        return true;
    } catch (error) {
        console.error('Erro ao atualizar', error)
        return false;
    }
}

// CRUD (DELETE)

export const deleteDivida = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM debt WHERE id = $id`, { $id: id });
        return true;
    } catch (error) {
        console.error('Erro ao tentar apagar divida (Func. deleteDivida => database.js):', error)
        return false;
    }

};


// DELETE DATABASE (DONT USE IN CURRENT DATABASE => GenFinances_V4)
export const deleteDatabase = async () => {
    try {
        await SQLite.deleteDatabaseAsync('GenFinances_V4.db');
        console.log('Banco de dados deletado');
    } catch (error) {
        console.error('Erro ao deletar banco de dados:', error);
    }
};