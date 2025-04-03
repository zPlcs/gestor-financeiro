import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('GenFinances_V2.db');
};

export const initDB = async () => {
    const db = await getDBConnection();
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dividas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            value REAL NOT NULL,
            date TEXT NOT NULL,
            category_id INTEGER,
            paymentType TEXT CHECK(paymentType IN ('Parcelado', 'Compra Única')),
            installments INTEGER DEFAULT 1,
            FOREIGN KEY (category_id) REFERENCES categorys(id)
          );
        `);

        await db.execAsync(`
         CREATE TABLE IF NOT EXISTS categorys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
            );
        `);
        console.log('Tabelas <dividas.table> e <categorys.table> criadas.');
    } catch (error) {
        console.error('Erro ao criar tabela (Func. initDB() => database.js)', error)
    }
};

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
        LEFT JOIN categorys c ON d.category_id = c.id`
        );
        console.log('Dados de <dividas.table> carregados.')
        for (const row of allRows) {
            console.log(row.id, row.value, row.name, row.date, row.category_id,row.category_name, row.paymentType, row.installments);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao carregar <dividas.table> (Func. getDivida() => database.js)', error)
    }
};

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

export const getCategorys = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM categorys`);
        console.log('Dados de <categorys.table> carregados.')
        for (const row of allRows) {
            console.log(row.id, row.name);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao ler categorias (Func. getCategorys() => database.js)', error)
    }
};

export const addCategory = async (category) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO categorys (name) VALUES (?)`,
            [category.categoryName]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar categoria (Func. addCategorys() => database.js):', error)
    }
};
