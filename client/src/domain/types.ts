export interface ApartamentoProps {
  id: string;
  numero: number;
  morador: string;
}

export interface DividaProps {
  id: string;
  valor: number;
  jurosAtrasoDiario: number;
  descricao?: string;
  dataVencimento: string;
}

export interface PagamentoProps {
  id: string;
  valorPago: number;
  dataPagamento: string;
  descricao?: string;
}

export interface CondominioProps {
  id: string;
  nome: string;
  valor: number;
  dataEmissao: string;
}

export interface CondominioBalanco {
  balanco: number;
}