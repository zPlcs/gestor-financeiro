import * as SQLite from 'expo-sqlite';

export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('financas.db');
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
            descricao TEXT
          );
        `);
        console.log('Tabela criada');
    } catch (error) {
        console.error('Erro ao criar tabela (Func. initDB() => database.js)', error)
    }
};

export const addDivida = async (divida) => {
    try {
        const db = await getDBConnection();
        const result = await db.runAsync(
            `INSERT INTO dividas (name, value, date, descricao) VALUES (?, ?, ?, ?)`,
            [divida.name, divida.value, divida.date, divida.descricao]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error('Erro ao criar a divida (Func. addDivida() => database.js):', error)
    }
};

export const getDivida = async () => {
    try {
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM dividas`);
        console.log('Leu as dividas')
        for (const row of allRows) {
            console.log(row.id, row.value, row.name, row.date);
        }
        return allRows;
    } catch (error) {
        console.error('Erro ao ler dividas (Func. getDivida() => database.js)', error)
    }
};

export const deleteDivida = async (id) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(`DELETE FROM dividas WHERE id = $id`, { $id: id });
        return true;
    } catch (error) {
        console.error("Erro ao tentar apagar", error)
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