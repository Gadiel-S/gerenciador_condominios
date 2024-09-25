import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DividaForm from '../components/dividaForm';

const DividaCadastrar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idApartamento, numeroApartamento } = location.state || {};

  const PassarIdApartamentoDividas = () => {
    navigate('/divida/listar', { state: {
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento
    } });
  }

  return (
    <div id='cadastrarApartamento' className='container'>
      <h1>Cadastrar Nova Dívida</h1>

      <DividaForm />

      <button onClick={() => PassarIdApartamentoDividas()}>
        Voltar á Lista de Dívidas
      </button>
    </div>
  );
};

export default DividaCadastrar;