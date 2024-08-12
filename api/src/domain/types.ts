export interface ApartamentoProps {
  numero: number,
  morador: string
};

export interface DividaProps {
  valor: number;
  jurosAtrasoDiario: number;
  dataVencimento: string;
  descricao?: string;
}

export interface PagamentoProps {
  valorPago: number;
  dataPagamento: string;
  descricao?: string;
}

export interface CondominioProps {
  nome: string;
  valor: number;
  dataEmissao: string;
}