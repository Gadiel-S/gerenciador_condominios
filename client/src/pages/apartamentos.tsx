import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApartamentoProps } from '../domain/types';
import { deletarApartamento } from '../services/apartamentoServices';

const Apartamentos: React.FC = () => {
  const [apartamentos, setApartamentos] = useState<ApartamentoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listarApartamentos = async () => {
      try {
        const response = await fetch('http://localhost:4000/apartamento/listar');
        if(!response.ok) {
          throw new Error("Erro ao buscar apartamentos");
        }
        const data = await response.json() as ApartamentoProps[];
        setApartamentos(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarApartamentos();
  }, []);

  const handleDeletarApartamento = async (id: string) => {
    const result = await deletarApartamento(id);
    if(result) {
      setApartamentos((apartamentosAnt) => apartamentosAnt.filter((apartamentosNovos) => apartamentosNovos.id !== id));
    }
  }

  const PassarIdApartamentoDividas = (apartamento: ApartamentoProps) => {
    navigate('/divida/listar', { state: {
      idApartamento: apartamento.id,
      numeroApartamento: apartamento.numero
    } });
  }

  const PassarIdApartamentoPagamentos = (apartamento: ApartamentoProps) => {
    navigate('/pagamento/listar', { state: {
      idApartamento: apartamento.id,
      numeroApartamento: apartamento.numero
    } });
  }

  return (
      <div className='container'>
        <h1>Lista de apartamentos</h1>

        <Link
          to="/apartamento/cadastrar"
          style={{ marginLeft: 'auto', display: 'block' }}>
            <button className='cadastrar-btn'>
              Cadastrar Apartamento
            </button>
        </Link>

        {loading && <p style={{color: 'green'}}>Buscando Apartamentos...</p>}
        {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

        <div className='apartamento-bloco'>
          {apartamentos.map((apartamento) => (
            <div key={apartamento.id} className='apartamento'>
              <p>Número: {apartamento.numero}</p>

              <p>Morador: {apartamento.morador}</p>

              <div className='apartamento-btns'>
                <button onClick={() => PassarIdApartamentoDividas(apartamento)}>Ver Dívidas</button>

                <button onClick={() => PassarIdApartamentoPagamentos(apartamento)}>Ver Pagamentos</button>

                <button
                  className='deletar-btn'
                  onClick={() => handleDeletarApartamento(apartamento.id)}>
                    Deletar Apartamento
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Apartamentos;