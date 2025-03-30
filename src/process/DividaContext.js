import React, { useState, createContext, useEffect } from 'react';
import { dbService, initDB } from '../database/database';



export const DividaContext = createContext();

export function DividaProvider({ children }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [datadecompra, setDatadecompra] = useState('');
  const [dividas, setDividas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicializa o banco e carrega as dívidas
  useEffect(() => {
    const loadData = async () => {
      try {
        await initDB();
        const loadedDividas = await dbService.getDividas();
        setDividas(loadedDividas);
      } catch (error) {
        console.error('Erro ao carregar dívidas:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Adiciona nova dívida
  // Remove dívida
  const removeDivida = async (id) => {
    try {
      await dbService.deleteDivida(id);
      setDividas(dividas.filter(d => d.id !== id));
    } catch (error) {
      console.error('Erro ao remover dívida:', error);
    }
  };

  // Limpa formulário
  const clearForm = () => {
    setNome('');
    setDescricao('');
    setValor('');
    setDatadecompra('');
  };

  return (
    <DividaContext.Provider value={{
      nome, setNome,
      descricao, setDescricao,
      valor, setValor,
      datadecompra, setDatadecompra,
      dividas,
      loading,
      setDividas,
      removeDivida,
      clearForm
    }}>
      {children}
    </DividaContext.Provider>
  );
}