import React, { useEffect, useState } from 'react';
import { CondominioProps } from '../domain/types';
import { useAuth0 } from '@auth0/auth0-react';

const ListaPrimeirasDespesas: React.FC = () => {
  const [despesas, setDespesas] = useState<CondominioProps[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarDespesas = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch('http://localhost:4000/condominio/despesa/listar/limitar/5',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error("Erro ao buscar despesas");
        }
        const despesas = await response.json() as CondominioProps[];
        setDespesas(despesas);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    listarDespesas();
  }, [getAccessTokenSilently]);

  return (
    <div>
      {Loading && <p style={{color: 'green'}}>Buscando Receitas...</p>}
      {error && <p>Erro: {error.message}</p>}

      <div className="apartamento-bloco">
        {despesas.map((despesa) => (
          <div key={despesa.id} className="apartamento">
            <p>Nome: {despesa.nome}</p>

            <p>Valor: {despesa.valor}</p>

            <p>Data Emissão: {despesa.dataEmissao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPrimeirasDespesas;