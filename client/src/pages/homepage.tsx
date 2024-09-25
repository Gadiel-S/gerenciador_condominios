import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CondominioBalanco } from '../domain/types';
import GraficoBalanco from '../components/graficoBalanco';
import ListaPrimeirasReceitas from '../components/listaPrimeirasReceitas';
import ListaPrimeirasDespesas from '../components/listaPrimeirasDespesas';
import { useAuth0 } from '@auth0/auth0-react';

const Homepage: React.FC = () => {
  const [balanco, setBalanco] = useState<CondominioBalanco | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const calcularBalanco = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch('http://localhost:4000/condominio/balanco',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
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
  }, [getAccessTokenSilently]);

  return (
    <div className='container'>
      <h1>Sistema Gerenciador de Condomínios</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error.message}</p>}
      {balanco && <h2>Balanço: {balanco.balanco}</h2>}

      <GraficoBalanco />

      <h2>Receitas</h2>

      <ListaPrimeirasReceitas />

      <Link to="/receita/listar"><button>Ver mais Receitas</button></Link>

      <h2>Despesas</h2>

      <ListaPrimeirasDespesas />

      <Link to="/despesa/listar"><button>Ver mais Despesas</button></Link>
    </div>
  );
};

export default Homepage;