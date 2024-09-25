import React from "react";
import { Link } from "react-router-dom";
import ReceitaForm from "../components/receitaForm";

const ReceitaAdicionar: React.FC = () => {
  return (
    <div id='cadastrarApartamento' className="container">
      <h1>Adicionar Receita</h1>

      <ReceitaForm />

      <Link to="/receita/listar"><button>Voltar á Lista de Receitas</button></Link>
    </div>
  );
}

export default ReceitaAdicionar;