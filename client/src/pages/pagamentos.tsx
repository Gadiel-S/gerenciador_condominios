import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListaPagamentos from "../components/listaPagamentos";

const Pagamentos: React.FC = () => {
  const location = useLocation();
  const { numeroApartamento } = location.state || {};

  return (
    <div className="container">
      <h1>Pagamentos do Apartamento {numeroApartamento}</h1>

      <Link to="/apartamento/listar">
        <button>
          Voltar á Lista de Apartamentos
        </button>
      </Link>

      <ListaPagamentos />
    </div>
  );
};

export default Pagamentos;