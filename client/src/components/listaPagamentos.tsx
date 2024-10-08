import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PagamentoProps } from "../domain/types";
import { deletarPagamento } from "../services/apartamentoServices";
import { useAuth0 } from '@auth0/auth0-react';

const ListaPagamentos: React.FC = () => {
  const [pagamentos, setPagamentos] = useState<PagamentoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const { idApartamento, numeroApartamento } = location.state || {};
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarPagamentos = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch(`http://localhost:4000/pagamento/listar/${idApartamento}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!response.ok) {
          throw new Error(`Erro ao buscar os pagamentos do Apartamento ${numeroApartamento}`);
        }
        const data = await response.json() as PagamentoProps[];
        setPagamentos(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarPagamentos();
  }, [idApartamento, numeroApartamento, getAccessTokenSilently]);

  useEffect(() => {
    console.log(pagamentos);
  }, [pagamentos]);


  const handleDeletarPagamento = async (id: string) => {
    const result = await deletarPagamento(id);
    if(result) {
      setPagamentos((pagamentosAnt) => pagamentosAnt.filter((pagamentosNovos) => pagamentosNovos.id !== id));
    }
  }

  return (
    <div>
      {loading && <p style={{color: 'green'}}>Buscando Pagamentos...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {pagamentos.map((pagamento) => (
          <div key={pagamento.id} className="apartamento">
            <p>Valor Pago: {pagamento.valorPago}</p>

            <p>Data de Pagamento: {pagamento.dataPagamento}</p>

            <button
              className="deletar-btn"
              onClick={() => handleDeletarPagamento(pagamento.id)}>
                Deletar Pagamento
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPagamentos;