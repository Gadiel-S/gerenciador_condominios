import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CondominioBalanco } from '../domain/types';
import { CondominioProps } from '../domain/types';
import GraficoBalanco from '../components/graficoBalanco';

const Homepage: React.FC = () => {
  const [balanco, setBalanco] = useState<CondominioBalanco | null>(null);
  const [receitas, setReceitas] = useState<CondominioProps[]>([]);
  const [despesas, setDespesas] = useState<CondominioProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [receitaLoad, setReceitaLoad] = useState<boolean>(true);
  const [despesaLoad, setDespesaLoad] = useState<boolean>(true);
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

    const listarReceitasDespesas = async () => {
      try {
        const receitasResponse = await fetch('http://localhost:4000/condominio/receita/listar/limitar/5');
        const despesasResponse = await fetch('http://localhost:4000/condominio/despesa/listar/limitar/5');
        if(!receitasResponse.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        if(!despesasResponse.ok) {
          throw new Error("Erro ao buscar despesas");
        }
        const receitas = await receitasResponse.json() as CondominioProps[];
        setReceitas(receitas);
        const despesas = await despesasResponse.json() as CondominioProps[];
        setDespesas(despesas);
      } catch (error) {
        setError(error as Error);
      } finally {
        setReceitaLoad(false);
        setDespesaLoad(false);
      }
    }

    listarReceitasDespesas();
    calcularBalanco();
  }, []);

  return (
    <div className='container'>
      <h1>Sistema Gerenciador de Condomínios</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {balanco && <h2>Balanço: {balanco.balanco}</h2>}

      <GraficoBalanco />

      <Link to="/apartamento/listar"><button>Lista de Apartamentos</button></Link>

      {receitaLoad && <p style={{color: 'green'}}>Buscando Receitas...</p>}

      <div className="apartamento-bloco">
        {receitas.map((receita) => (
          <div key={receita.id} className="apartamento">
            <p>Nome: {receita.nome}</p>

            <p>Valor: {receita.valor}</p>

            <p>Data Emissão: {receita.dataEmissao}</p>
          </div>
        ))}
      </div>

      <Link to="/receita/listar"><button>Ver mais Receitas</button></Link>

      {despesaLoad && <p style={{color: 'green'}}>Buscando Despesas...</p>}

      <div className="apartamento-bloco">
        {despesas.map((despesa) => (
          <div key={despesa.id} className="apartamento">
            <p>Nome: {despesa.nome}</p>

            <p>Valor: {despesa.valor}</p>

            <p>Data Emissão: {despesa.dataEmissao}</p>
          </div>
        ))}
      </div>

      <Link to="/despesa/listar"><button>Ver mais Despesas</button></Link>
    </div>
  );
};

export default Homepage;