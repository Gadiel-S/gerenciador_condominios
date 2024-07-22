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
  id: string;
  numero: number;
  morador: string;
  dividas: Divida[];
  get pagamentos(){
    return this.dividas.filter(divida => divida.dataPagamento != null);
  }

  constructor(numero: number, morador: string, dividas: Divida[],id: string){
    this.id = id;
    this.numero = numero;
    this.morador = morador;
    this.dividas = dividas;
  }
}

export interface Divida {
  id: string,
  valor: number,
  dataVencimento: Date,
  descricao: string,
  jurosAtrasoDiario: number,
  dataPagamento?: Date
}

export interface Pagamento {
  valor: number,
  data: Date
}
