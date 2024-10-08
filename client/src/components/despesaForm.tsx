import React, { useState } from "react";
import { formatarValor } from "../services/apartamentoServices";
import { useAuth0 } from "@auth0/auth0-react";

const DespesaForm: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [emissao, setEmissao] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<string | null>('');
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valorFormatado = formatarValor(valor);
    const despesa = {
      nome: nome,
      valor: valorFormatado,
      dataEmissao: emissao
    }
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://gerenciador.condominios',
        },
      });
      const response = await fetch('http://localhost:4000/condominio/despesa/adicionar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(despesa)
      });
      if(!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      setSuccess('Nova Despesa adicionada com sucesso!');
    } catch (error) {
      setError(error as Error);
      setSuccess(null);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="apartamento-form">
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="valor">Valor:</label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="dataEmissao">Data de Emissão:</label>
            <input
              type="date"
              id="dataEmissao"
              value={emissao}
              onChange={(e) => setEmissao(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" className="cadastrar-btn">Adicionar</button>
        </div>
      </form>

      {success && <p style={{color: 'green'}}>{success}</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}
    </div>
  );
};

export default DespesaForm;