import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CondominioProps } from "../domain/types";
import { deletarDespesa } from "../services/condominioServices";

const Despesas: React.FC = () => {
  const [despesas, setDespesas] = useState<CondominioProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const listarDespesas = async () => {
      try {
        const response = await fetch('http://localhost:4000/condominio/despesa/listar');
        if(!response.ok) {
          throw new Error("Erro ao buscar despesas");
        }
        const data = await response.json() as CondominioProps[];
        setDespesas(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    listarDespesas();
  }, []);

  const handleDeletarDespesa = async (id: string) => {
    const result = await deletarDespesa(id);
    if(result) {
      setDespesas((despesasAnt) => despesasAnt.filter((despesasNovas) => despesasNovas.id !== id));
    }
  }

  return (
    <div className="container">
      <h1>Lista de Despesas</h1>

      <Link
        to="/despesa/adicionar"
        style={{ marginLeft: 'auto', display: 'block' }}>
          <button className="cadastrar-btn">
            Adicionar Despesa
          </button>
      </Link>


      {loading && <p style={{color: 'green'}}>Buscando Despesas...</p>}
      {error && error.message && <p style={{color: 'red'}}>{error.message}</p>}

      <div className="apartamento-bloco">
        {despesas.map((despesa) => (
          <div key={despesa.id} className="apartamento">
            <p>Nome: {despesa.nome}</p>

            <p>Valor: {despesa.valor}</p>

            <p>Data Emissão: {despesa.dataEmissao}</p>

            <div className="apartamento-btns">
              <button
                className="deletar-btn"
                onClick={() => handleDeletarDespesa(despesa.id)}>
                  Deletar Despesa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Despesas;