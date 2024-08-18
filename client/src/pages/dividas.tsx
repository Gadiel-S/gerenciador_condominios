import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DividaProps } from "../domain/types";
import { deletarDivida } from "../services/apartamentoServices";

const Dividas: React.FC = () => {
  const [dividas, setDividas] = useState<DividaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { idApartamento, numeroApartamento } = location.state || {};

  useEffect(() => {
    const listarDividas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/divida/listar/${idApartamento}`);
        if(!response.ok) {
          throw new Error(`Erro ao buscar as dívidas do Apartamento ${numeroApartamento}`);
        }
        const data = await response.json() as DividaProps[];
        setDividas(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarDividas();
  }, [idApartamento, numeroApartamento]);

  const handleDeletarDivida = async (id: string) => {
    const result = await deletarDivida(id);
    if(result) {
      setDividas((dividasAnt) => dividasAnt.filter((dividasNovas) => dividasNovas.id !== id));
    }
  }

  const PassarIdApartamentoCadastro = () => {
    navigate('/divida/cadastrar', { state: {
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento
    } });
  }

  const PassarIdApartamentoPagamento = (idDivida: string) => {
    navigate('/divida/RegistrarPagamento', { state: { 
      idApartamento: idApartamento,
      numeroApartamento: numeroApartamento,
      idDivida: idDivida
     } });
  }

  return (
    <div id="apartamento" className="container">
      <h1>Dívidas do Apartamento {numeroApartamento}</h1>

      <Link to="/apartamento/listar">
        <button>
          Voltar á Lista de Apartamentos
        </button>
      </Link>

      <button
        style={{ marginLeft: 'auto', display: 'block' }}
        className="cadastrar-btn"
        onClick={() => PassarIdApartamentoCadastro()}>
          Cadastrar Dívida
      </button>

      {loading && <p style={{color: 'green'}}>Buscando Dívidas...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {dividas.map((divida) => (
          <div key={divida.id} className="apartamento">
            <p>Valor: {divida.valor}</p>

            <p>Juros de Atraso Diário: {divida.jurosAtrasoDiario}</p>

            <p>Data de Vencimento: {divida.dataVencimento}</p>

            <div className="apartamento-btns">
              <button
                className="cadastrar-btn"
                onClick={() => PassarIdApartamentoPagamento(divida.id)}>
                  Pagar Dívida
              </button>

              <button
                className="deletar-btn"
                onClick={() => handleDeletarDivida(divida.id)}>
                  Deletar Dívida
              </button>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dividas;