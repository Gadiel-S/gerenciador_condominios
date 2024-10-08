import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import { formatarValor } from '../services/apartamentoServices';
import { useAuth0 } from '@auth0/auth0-react';

const DividaForm: React.FC = () => {
  const [valor, setValor] = useState<string>('');
  const [juros, setJuros] = useState<string>('');
  const [vencimento, setVencimento] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const location = useLocation();
  const { idApartamento, numeroApartamento } = location.state || {};
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valorFormatado = formatarValor(valor);
    const jurosFormatado = formatarValor(juros);
    const divida = {
      valor: valorFormatado,
      jurosAtrasoDiario: jurosFormatado,
      dataVencimento: vencimento,
      descricao: descricao
    }
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://gerenciador.condominios',
        },
      });
      const response = await fetch(`http://localhost:4000/divida/cadastrar/${idApartamento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(divida)
      });

      if(!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      setSuccess(`Nova Dívida para o Apartamento ${numeroApartamento} criada com sucesso!`);

    } catch (error) {
      setError(error as Error);
      setSuccess(null);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='apartamento-form'>
        <div className='form-fields'>
          <div className='form-field'>
            <label htmlFor='valor'>Valor:</label>
            <input
              type='number'
              id='valor'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='jurosAtrasoDiario'>Juros de Atraso Diário:</label>
            <input
              type='number'
              id='jurosAtrasoDiario'
              value={juros}
              onChange={(e) => setJuros(e.target.value)}
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='dataVencimento'>Data de Vencimento:</label>
            <input
              type='date'
              id='dataVencimento'
              value={vencimento}
              onChange={(e) => setVencimento(e.target.value)}
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='descricao'>Descrição: </label>
            <input
              type='text'
              id='descricao'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)} />
          </div>
        </div>

        <div className='form-btns'>
          <button type='submit' className='cadastrar-btn'>Cadastrar</button>
        </div>
      </form>

      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default DividaForm;