import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApartamentoProps } from '../domain/types';
import { deletarApartamento } from '../services/apartamentoServices';
import { useAuth0 } from '@auth0/auth0-react';

const ListaApartamentos: React.FC = () => {
  const [apartamentos, setApartamentos] = useState<ApartamentoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarApartamentos = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const response = await fetch('http://localhost:4000/apartamento/listar',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
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
  }, [getAccessTokenSilently]);

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
    <div>
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
  )
}

export default ListaApartamentos;