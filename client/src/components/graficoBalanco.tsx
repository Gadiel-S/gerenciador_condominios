import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { CondominioProps } from "../domain/types";
import { useAuth0 } from '@auth0/auth0-react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const GraficoBalanco: React.FC = () => {
  const [receitas, setReceitas] = useState<CondominioProps[]>([]);
  const [despesas, setDespesas] = useState<CondominioProps[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const listarReceitasDespesas = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://gerenciador.condominios',
          },
        });
        const receitasResponse = await fetch('http://localhost:4000/condominio/receita/listar',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const despesasResponse = await fetch('http://localhost:4000/condominio/despesa/listar',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if(!receitasResponse.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        if(!despesasResponse.ok) {
          throw new Error("Erro ao buscar despesas");
        }
        const receitas = await receitasResponse.json() as CondominioProps[];
        setReceitas(receitas);
        const despesas = await despesasResponse.json() as CondominioProps[];
        setDespesas(despesas);
      } catch (error) {
        console.error('Erro ao buscar receitas e despesas:', error);
      }
    };

    listarReceitasDespesas();
  }, [getAccessTokenSilently]);

  const grafico = {
    labels: receitas.map((receita) => receita.dataEmissao),
    datasets: [
      {
        label: 'Receitas',
        data: receitas.map((receitas) => receitas.valor),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Despesas',
        data: despesas.map((despesa) => despesa.valor),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <div style={{ width: '100%', height: '100%', minHeight: '12em' }}>
        <Line data={grafico} options={options}/>
      </div>
    </div>
  );
};

export default GraficoBalanco;