import React from "react";
import { Link } from "react-router-dom";
import ListaDespesas from "../components/listaDespesas";

const Despesas: React.FC = () => {
  return (
    <div className="container">
      <h1>Lista de Despesas</h1>

      <Link
        to="/despesa/adicionar"
        style={{ marginLeft: 'auto', display: 'block' }}>
          <button className="cadastrar-btn">
            Adicionar Despesa
          </button>
      </Link>


      <ListaDespesas />
    </div>
  );
};

export default Despesas;