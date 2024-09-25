import React from "react";
import { Link } from "react-router-dom";
import DespesaForm from "../components/despesaForm";

const DespesaAdicionar: React.FC = () => {
  return (
    <div id='cadastrarApartamento' className="container">
      <h1>Adicionar Despesa</h1>

      <DespesaForm />

      <Link to="/despesa/listar"><button>Voltar á Lista de Despesas</button></Link>
    </div>
  );
}

export default DespesaAdicionar;