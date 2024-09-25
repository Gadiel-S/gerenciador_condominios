import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListaDividas from "../components/listaDividas";

const Dividas: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { idApartamento, numeroApartamento } = location.state || {};

  const PassarIdApartamentoCadastro = () => {
    navigate('/divida/cadastrar', { state: {
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento
    } });
  }

  return (
    <div className="container">
      <h1>Dívidas do Apartamento {numeroApartamento}</h1>

      <Link to="/apartamento/listar">
        <button>
          Voltar á Lista de Apartamentos
        </button>
      </Link>

      <button
        style={{ marginLeft: 'auto', display: 'block' }}
        className="cadastrar-btn"
        onClick={() => PassarIdApartamentoCadastro()}>
          Cadastrar Dívida
      </button>

      <ListaDividas />
    </div>
  );
};

export default Dividas;