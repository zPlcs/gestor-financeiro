import * as SQLite from 'expo-sqlite';

// Função para abrir o banco de dados
const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('GenFinances.db');
};

// Exporta a função initDB corretamente
export const initDB = async () => {
  try {
    const db = await openDatabase();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS dividas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        valor REAL NOT NULL,
        datadecompra TEXT NOT NULL
      );
    `);
    console.log('Banco de dados inicializado com sucesso');
    return db; // Retorna a instância do banco
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    throw error;
  }
};

// Operações CRUD
export const dbService = {
  addDivida: async (divida) => {
    const db = await openDatabase();
    const result = await db.runAsync(
      'INSERT INTO dividas (nome, descricao, valor, datadecompra) VALUES (?, ?, ?, ?)',
      [divida.nome, divida.descricao, parseFloat(divida.valor), divida.datadecompra]
    );
    return result.lastInsertRowId;
  },

  getDividas: async () => {
    const db = await openDatabase();
    return await db.getAllAsync('SELECT * FROM dividas ORDER BY datadecompra DESC');
  },

  updateDivida: async (id, divida) => {
    const db = await openDatabase();
    try {
      const result = await db.runAsync(
        'UPDATE dividas SET nome=?, descricao=?, valor=?, datadecompra=? WHERE id=?',
        [
          divida.nome,
          divida.descricao,
          divida.valor, // Já convertido para número
          divida.datadecompra,
          id
        ]
      );
      return result.changes;
    } finally {
      await db.closeAsync(); // Importante fechar a conexão
    }
  },

  deleteDivida: async (id) => {
    const db = await openDatabase();
    const result = await db.runAsync(
      'DELETE FROM dividas WHERE id=?',
      [id]
    );
    return result.changes;
  }
};