import React from "react";
import { Link } from "react-router-dom";
import ListaReceitas from "../components/listaReceitas";

const Receitas: React.FC = () => {
  return (
    <div className="container">
      <h1>Lista de Receitas</h1>

      <Link
        to="/receita/adicionar"
        style={{ marginLeft: 'auto', display: 'block' }}>
          <button className="cadastrar-btn">
            Adicionar Receita
          </button>
      </Link>

      <ListaReceitas />
    </div>
  );
};

export default Receitas;