import { DividaFactory } from "./factory/divida_factory";
import { Condominio, Despesa, Apartamento, Divida } from "./domain/types";

export class Gestor {
  condominio: Condominio;
  apartamentos: Apartamento[];
  
  private dividaFactory:DividaFactory;

  constructor(dividaFactory:DividaFactory){
    this.condominio = {
      despesas: [],
      receitas: [],
    };
    this.apartamentos = [];
    this.dividaFactory = dividaFactory
  };

  adicionarDespesa = (despesa: Despesa) => {
    this.condominio.despesas.push(despesa);
  }

  cadastrarApartamento = (apartamento:Apartamento) => {
    this.apartamentos.push(apartamento);
  }

  cadastrarDivida(apartamento: Apartamento, divida: Divida[]){
    // const dividas: Divida[] = this.dividaFactory.gerarDivida();
    apartamento.dividas.push(...divida);
  }

  registrarPagamento = (apartamento: Apartamento, divida: Divida) => {
    const dataPagamento = new Date();    
    divida.data_pagamento = dataPagamento;
    const dividaIndice = apartamento.dividas.indexOf(divida);
    apartamento.dividas.splice(dividaIndice, 1);
    apartamento.pagamentos.push(divida);
    this.condominio.receitas.push({nome: divida.descricao, valor: divida.valor, data_emissao: dataPagamento});
  }

  calcularBalanco = () => {
    let totalDespesas = this.condominio.despesas.reduce((total, despesa) => total + despesa.valor, 0);
    let totalReceitas = this.condominio.receitas.reduce((total, receita) => total + receita.valor, 0);
    return totalReceitas - totalDespesas
  }
}