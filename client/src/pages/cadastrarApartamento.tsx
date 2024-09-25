import React from 'react';
import { Link } from 'react-router-dom';
import ApartamentoForm from '../components/apartamentoForm';

const ApartamentoCadastrar: React.FC = () => {
  return (
    <div id='cadastrarApartamento' className='container'>
      <h1>Cadastrar Novo Apartamento</h1>

      <ApartamentoForm />

      <Link to="/apartamento/listar"><button>Voltar á Lista de Apartamentos</button></Link>
    </div>
  );
};

export default ApartamentoCadastrar;