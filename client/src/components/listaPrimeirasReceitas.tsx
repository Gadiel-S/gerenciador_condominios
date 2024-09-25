import React, { useEffect, useState } from 'react';
import { CondominioProps } from '../domain/types';
import { useAuth0 } from '@auth0/auth0-react';

const ListaPrimeirasReceitas: React.FC = () => {
  const [receitas, setReceitas] = useState<CondominioProps[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarReceitas = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch('http://localhost:4000/condominio/receita/listar/limitar/5',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        const receitas = await response.json() as CondominioProps[];
        setReceitas(receitas);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    listarReceitas();
  }, [getAccessTokenSilently]);

  return (
    <div>
      {Loading && <p style={{color: 'green'}}>Buscando Receitas...</p>}
      {error && <p>Erro: {error.message}</p>}

      <div className="apartamento-bloco">
        {receitas.map((receita) => (
          <div key={receita.id} className="apartamento">
            <p>Nome: {receita.nome}</p>

            <p>Valor: {receita.valor}</p>

            <p>Data Emissão: {receita.dataEmissao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPrimeirasReceitas;