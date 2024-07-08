export interface Condominio {
  despesas: Despesa[],
  receitas: Receita[]
}

export interface Receita {
  nome: string,
  valor: number,
  data_emissao: Date
}

export interface Despesa {
  nome: string,
  valor: number,
  data_emissao: Date
}

export interface Apartamento {
  numero: number,
  morador: string,
  pagamentos: Pagamentos[],
}

export interface Pagamentos {
  valor: number,
  data: Date,
}
