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
    } catch(error) {
        console.error('Erro ao criar tabela', error)
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
    console.error('Erro ao criar a divida', error)
   }
};

export const getDivida = async () => {
    try{
        const db = await getDBConnection();
        const allRows = await db.getAllAsync(`SELECT * FROM dividas`);
        console.log('Leu as dividas')
        for (const row of allRows) {
            console.log(row.id, row.value, row.name, row.date);
          }
        return allRows;
    } catch(error){
        console.error('Erro ao ler dividas', error)
    }
};