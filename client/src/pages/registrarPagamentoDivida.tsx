import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatarValor } from "../services/apartamentoServices";

const RegistrarPagamentoDivida: React.FC = () => {
  const [valor, setValor] = useState<string>('');
  const [pagamentoData, setPagamentoData] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { idApartamento, numeroApartamento, divida } = location.state || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valorFormatado = formatarValor(valor);
    const pagamento = {
      valorPago: valorFormatado,
      dataPagamento: pagamentoData,
      descricao: descricao
    }
    try {
      const response = await fetch(`http://localhost:4000/pagamento/registrarPagamentoDivida/${divida.id}/apartamento/${idApartamento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    <div id='cadastrarApartamento' className="container">
      <h1>Registrar Pagamento da Dívida</h1>

      <div className="apartamento-bloco">
          <div key={divida.id} className="apartamento">
            <p>Valor: {divida.valor}</p>

            <p>Juros de Atraso Diário: {divida.jurosAtrasoDiario}</p>

            <p>Data de Vencimento: {divida.dataVencimento}</p>
          </div>
      </div>

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

      <button onClick={() => PassarIdApartamentoDividas()}>
        Voltar á Lista de Dívidas
      </button>

      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default RegistrarPagamentoDivida;