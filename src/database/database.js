import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('GenFinances.db');

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS dividas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          descricao TEXT,
          valor REAL,
          datadecompra TEXT
        );`,
            [],
            () => console.log('Tabela de dívidas criada'),
            (_, error) => console.log('Erro ao criar tabela', error)
        );
    });
};

export const addDivida = (nome, descricao, valor, datadecompra, callback) => {
    db.dividas(tx => {
        tx.executeSql(
            `INSERT INTO dividas (nome, descricao, valor, datadecompra) VALUES (?, ?, ?, ?);`,
            [nome, descricao, parseFloat(valor), datadecompra],
            (_, result) => callback(result.insertId),
            (_, error) => console.log('Erro ao inserir dívida', error)
        );
    });
};

export const getDividas = (callback) => {
    db.dividas(tx => {
        tx.executeSql(
            `SELECT * FROM dividas;`,
            [],
            (_, { rows }) => callback(rows._array),
            (_, error) => console.log('Erro ao buscar dívidas', error)
        );
    });
};

export const updateDivida = (id, nome, descricao, valor, datadecompra, callback) => {
    db.dividas(tx => {
        tx.executeSql(
            `UPDATE dividas SET nome=?, descricao=?, valor=?, datadecompra=? WHERE id=?;`,
            [nome, descricao, parseFloat(valor), datadecompra, id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => console.log('Erro ao atualizar dívida', error)
        );
    });
};

export const deleteDivida = (id, callback) => {
    db.dividas(tx => {
        tx.executeSql(
            `DELETE FROM dividas WHERE id=?;`,
            [id],
            (_, result) => callback(result.rowsAffected),
            (_, error) => console.log('Erro ao deletar dívida', error)
        );
    });
};