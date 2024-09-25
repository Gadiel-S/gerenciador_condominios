import React, { useEffect, useState } from "react";
import { CondominioProps } from "../domain/types";
import { deletarReceita } from "../services/condominioServices";
import { useAuth0 } from "@auth0/auth0-react";

const ListaReceitas: React.FC = () => {
  const [receitas, setReceitas] = useState<CondominioProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        const response = await fetch('http://localhost:4000/condominio/receita/listar',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        const data = await response.json() as CondominioProps[];
        setReceitas(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarReceitas();
  }, [getAccessTokenSilently]);

  const handleDeletarReceita = async (id: string) => {
    const result = await deletarReceita(id);
    if(result) {
      setReceitas((receitasAnt) => receitasAnt.filter((receitasNovas) => receitasNovas.id !== id));
    }
  }

  return (
    <div>
      {loading && <p style={{color: 'green'}}>Buscando Receitas...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {receitas.map((receita) => (
          <div key={receita.id} className="apartamento">
            <p>Nome: {receita.nome}</p>

            <p>Valor: {receita.valor}</p>

            <p>Data Emissão: {receita.dataEmissao}</p>

            <div className="apartamento-btns">
              <button
                className="deletar-btn"
                onClick={() => handleDeletarReceita(receita.id)}>
                  Deletar Receita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaReceitas;