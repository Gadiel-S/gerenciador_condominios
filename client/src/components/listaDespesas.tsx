import React, { useEffect, useState } from "react";
import { CondominioProps } from "../domain/types";
import { deletarDespesa } from "../services/condominioServices";
import { useAuth0 } from "@auth0/auth0-react";

const ListaDespesas: React.FC = () => {
  const [despesas, setDespesas] = useState<CondominioProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        const response = await fetch('http://localhost:4000/condominio/despesa/listar',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error("Erro ao buscar despesas");
        }
        const data = await response.json() as CondominioProps[];
        setDespesas(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarDespesas();
  }, [getAccessTokenSilently]);

  const handleDeletarDespesa = async (id: string) => {
    const result = await deletarDespesa(id);
    if(result) {
      setDespesas((despesasAnt) => despesasAnt.filter((despesasNovas) => despesasNovas.id !== id));
    }
  }

  return (
    <div>
      {loading && <p style={{color: 'green'}}>Buscando Despesas...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {despesas.map((despesa) => (
          <div key={despesa.id} className="apartamento">
            <p>Nome: {despesa.nome}</p>

            <p>Valor: {despesa.valor}</p>

            <p>Data Emissão: {despesa.dataEmissao}</p>

            <div className="apartamento-btns">
              <button
                className="deletar-btn"
                onClick={() => handleDeletarDespesa(despesa.id)}>
                  Deletar Despesa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaDespesas;