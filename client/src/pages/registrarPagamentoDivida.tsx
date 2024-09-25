import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PagamentoForm from "../components/pagamentoForm";

const RegistrarPagamentoDivida: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idApartamento, numeroApartamento, divida } = location.state || {};

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

      <PagamentoForm />

      <button onClick={() => PassarIdApartamentoDividas()}>
        Voltar á Lista de Dívidas
      </button>
    </div>
  );
};

export default RegistrarPagamentoDivida;