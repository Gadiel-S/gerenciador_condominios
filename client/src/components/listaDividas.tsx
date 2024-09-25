import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DividaProps } from "../domain/types";
import { deletarDivida } from "../services/apartamentoServices";
import { useAuth0 } from '@auth0/auth0-react';

const ListaDividas: React.FC = () => {
  const [dividas, setDividas] = useState<DividaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { idApartamento, numeroApartamento } = location.state || {};
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarDividas = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch(`http://localhost:4000/divida/listar/${idApartamento}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error(`Erro ao buscar as dívidas do Apartamento ${numeroApartamento}`);
        }
        const data = await response.json() as DividaProps[];
        setDividas(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarDividas();
  }, [idApartamento, numeroApartamento, getAccessTokenSilently]);

  const handleDeletarDivida = async (id: string) => {
    const result = await deletarDivida(id);
    if(result) {
      setDividas((dividasAnt) => dividasAnt.filter((dividasNovas) => dividasNovas.id !== id));
    }
  }

  const PassarIdApartamentoPagamento = (divida: DividaProps) => {
    navigate('/divida/RegistrarPagamento', { state: { 
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento,
      divida: divida
     } });
  }

  return (
    <div>
      {loading && <p style={{color: 'green'}}>Buscando Dívidas...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {dividas.map((divida) => (
          <div key={divida.id} className="apartamento">
            <p>Valor: {divida.valor}</p>

            <p>Juros de Atraso Diário: {divida.jurosAtrasoDiario}</p>

            <p>Data de Vencimento: {divida.dataVencimento}</p>

            <div className="apartamento-btns">
              <button
                className="cadastrar-btn"
                onClick={() => PassarIdApartamentoPagamento(divida)}>
                  Pagar Dívida
              </button>

              <button
                className="deletar-btn"
                onClick={() => handleDeletarDivida(divida.id)}>
                  Deletar Dívida
              </button>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaDividas;