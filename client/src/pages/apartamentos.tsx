import React from 'react';
import { Link } from 'react-router-dom';
import ListaApartamentos from '../components/listaApartamentos';

const Apartamentos: React.FC = () => {
  return (
      <div className='container'>
        <h1>Lista de Apartamentos</h1>

        <Link
          to="/apartamento/cadastrar"
          style={{ marginLeft: 'auto', display: 'block' }}>
            <button className='cadastrar-btn'>
              Cadastrar Apartamento
            </button>
        </Link>

        <ListaApartamentos />
      </div>
  );
}

export default Apartamentos;