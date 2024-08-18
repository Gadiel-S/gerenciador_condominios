import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <div className='container'>
      <h1>Sistema Gerenciador de Condomínios</h1>
      <Link to="/apartamento/listar"><button>Lista de Apartamentos</button></Link>
      <Link to="/condominio/balanco"><button>Receitas e Despesas</button></Link>
    </div>
  );
};

export default Homepage;