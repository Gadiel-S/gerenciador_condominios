import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CondominioBalanco } from '../domain/types';

const Condominio: React.FC = () => {
  const [balanco, setBalanco] = useState<CondominioBalanco | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const calcularBalanco = async () => {
      try {
        const response = await fetch('http://localhost:4000/condominio/balanco');
        if(!response.ok) {
          throw new Error("Erro ao calcular balanço");
        }
        const data = await response.json() as CondominioBalanco;
        setBalanco(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    calcularBalanco();
  }, []);

  return (
    <div className='container'>
      <h1>Status do Condomínio</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {balanco && <h2>Balanço: {balanco.balanco}</h2>}

      <Link to="/receita/listar"><button>Lista de Receitas</button></Link>
      <Link to="/despesa/listar"><button>Lista de Despesas</button></Link>
    </div>
  );
};

export default Condominio;