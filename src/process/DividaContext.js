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
  const [editingId, setEditingId] = useState(null);

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

  // Edita dívida
  const updateDivida = async (id) => {
    if (!nome || !valor || !datadecompra) {
      alert('Nome, valor e data são obrigatórios!');
      return;
    } try {
      // Garantir que o valor é numérico
      const valorNumerico = parseFloat(valor);
      if (isNaN(valorNumerico)) {
        alert('Valor deve ser um número válido');
        return;
      }
      const dividaAtualizada = {
        nome,
        descricao: descricao || null,
        valor: valorNumerico,
        datadecompra
      };

      const changes = await dbService.updateDivida(id, dividaAtualizada);

      if (changes > 0) {
        setDividas(dividas.map(divida =>
          divida.id === id ? { ...dividaAtualizada, id } : divida
        ));
        clearForm();
        setEditingId(null);
      } else {
        alert('Nenhuma dívida foi atualizada');
      }
    } catch (error) {
      console.error('Erro ao atualizar dívida:', error);
      alert(`Erro ao atualizar dívida: ${error.message}`);
    }
  };


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
      editingId, setEditingId,
      dividas,
      loading,
      setDividas,
      removeDivida,
      clearForm,
      updateDivida
    }}>
      {children}
    </DividaContext.Provider>
  );
}