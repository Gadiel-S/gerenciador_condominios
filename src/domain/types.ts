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

export class Apartamento {

  numero: number;
  morador: string;
  dividas: Divida[];

  constructor(numero: number, morador: string, dividas: Divida[],){
    this.numero = numero;
    this.morador = morador;
    this.dividas = dividas;
  }

  get pagamentos(){
    return this.dividas.filter(divida => divida.data_pagamento != null);
  }
}

export interface Divida {
  valor: number,
  data_vencimento: Date,
  descricao: string,
  juros_atraso_diario: number,
  data_pagamento?: Date
}

export interface Pagamento
 {
  valor: number,
  data: Date,
}
