import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatarValor, formatarData } from '../services/apartamentoServices';

const DividaCadastrar: React.FC = () => {
  const [valor, setValor] = useState<string>('');
  const [juros, setJuros] = useState<string>('');
  const [vencimento, setVencimento] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { idApartamento, numeroApartamento } = location.state || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valorFormatado = formatarValor(valor);
    const jurosFormatado = formatarValor(juros);
    const dataFormatada = formatarData(vencimento);
    const divida = {
      valor: valorFormatado,
      jurosAtrasoDiario: jurosFormatado,
      dataVencimento: dataFormatada,
      descricao: descricao
    }
    try {
      const response = await fetch(`http://localhost:4000/divida/cadastrar/${idApartamento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const PassarIdApartamentoDividas = () => {
    navigate('/divida/listar', { state: {
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento
    } });
  }

  return (
    <div id='cadastrarApartamento' className='container'>
      <h1>Cadastrar Nova Dívida</h1>

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

      <button onClick={() => PassarIdApartamentoDividas()}>
        Voltar á Lista de Dívidas
      </button>

      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default DividaCadastrar;