import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatarValor } from "../services/apartamentoServices";
import { useAuth0 } from '@auth0/auth0-react';

const PagamentoForm: React.FC = () => {
  const [valor, setValor] = useState<string>('');
  const [pagamentoData, setPagamentoData] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { idApartamento, numeroApartamento, divida } = location.state || {};
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valorFormatado = formatarValor(valor);
    const pagamento = {
      valorPago: valorFormatado,
      dataPagamento: pagamentoData,
      descricao: descricao
    }
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://gerenciador.condominios',
        },
      });
      const response = await fetch(`http://localhost:4000/pagamento/registrarPagamentoDivida/${divida.id}/apartamento/${idApartamento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(pagamento)
      });

      if(!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      PassarIdApartamentoDividas();
    } catch (error) {
      setError(error as Error);
    }
  }

  const PassarIdApartamentoDividas = () => {
    navigate('/divida/listar', { state: {
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento
    } });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="apartamento-form">
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="valorPago">Valor Pago:</label>
            <input
              type='number'
              id='valorPago'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="dataPagamento">Data do Pagamento:</label>
            <input
              type='date'
              id='dataPagamento'
              value={pagamentoData}
              onChange={(e) => setPagamentoData(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="descricao">Descrição:</label>
            <input
              type='text'
              id='descricao'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" className="cadastrar-btn">Registrar Pagamento</button>
        </div>
      </form>

      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default PagamentoForm;