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

export interface UsuarioLogin {
  nomeUsuario: string;
  senha: string;
}

export interface UsuarioCadastro {
  nomeUsuario: string;
  email: string;
  senha: string;
}