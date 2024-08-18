import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { transformarNumero } from '../services/apartamentoServices';

const ApartamentoCadastrar: React.FC = () => {
  const [numero, setNumero] = useState<string>('');
  const [morador, setMorador] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numeroValido = transformarNumero(numero);
    const apartamento = {
      numero: numeroValido,
      morador: morador
    }
    try {
      const response = await fetch('http://localhost:4000/apartamento/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apartamento)
      });

      if(!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      setSuccess('Novo Apartamento criado com sucesso!');

    } catch (error) {
      setError(error as Error);
      setSuccess(null);
    }
  }

  return (
    <div id='cadastrarApartamento' className='container'>
      <h1>Cadastrar Novo Apartamento</h1>

      <form onSubmit={handleSubmit} className='apartamento-form'>
        <div className='form-fields'>
          <div className='form-field'>
            <label htmlFor='numero'>Número:</label>
            <input
              type='number'
              id='numero'
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          <div className='form-field'>
            <label htmlFor='morador'>Morador:</label>
            <input
              type='text'
              id='morador'
              value={morador}
              onChange={(e) => setMorador(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='form-btns'>
          <button type='submit' className='cadastrar-btn'>Cadastrar</button>
        </div>
      </form>

      <Link to="/apartamento/listar"><button>Voltar á Lista de Apartamentos</button></Link>

      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default ApartamentoCadastrar;