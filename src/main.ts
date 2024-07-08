
//todo criar o gestor do condominio
/**
 classe que irá controlar as coisas
 
 função adiconar despesas e receitas
 funcao de calcular todas os gastos e receitas

 funcao cadastro de apartamentos
    criar 2 apartamentos
      realizar o pagamento do condominio para cada apartamento
    
  funcao para exibir o pagamento por apartamento


*/

import { Condominio, Despesa, Receita, Apartamento } from "./types";

class Gestor {
  condominio: Condominio;
  apartamentos: Apartamento[];

  constructor(){
    this.condominio = {
      despesas: [],
      receitas: [],
    };
    this.apartamentos = [];
  };

  adicionarDespesa = (despesa: Despesa) => {
    this.condominio.despesas.push(despesa);
  }

  cadastrarApartamento = (numero: number, morador: string) => {
    let apartamento: Apartamento = {
      numero: numero,
      morador: morador,
      pagamentos: []
    }
    this.apartamentos.push(apartamento);
    
  }

  realizarPagamento = (numero: number, valor: number, data: Date, vencimento: Date) => {
    let apartamento = this.apartamentos.find(ap => ap.numero === numero);
    if(apartamento) {
      // Adicinar pagamento
      let atraso = (data.valueOf() - vencimento.valueOf()) / (1000 * 60 * 60 * 24);
      if(atraso > 0) {
        let taxa = ((valor * 0.01)/30)*atraso;
        valor += taxa;
      }
      apartamento.pagamentos.push({valor: valor, data: data});
      // Adicionar Receita
      this.condominio.receitas.push({nome: "Taxa", valor: valor, data_emissao: new Date()});
    } else {
      console.log(`Apartamento ${numero} não encontrado.`);
    }
  }

  exibirPagamentos = () => {
    this.apartamentos.forEach(ap => {
      console.log(`Pagamentos do apartamento ${ap.numero}:`);
      if(ap.pagamentos.length !== 0) {
        ap.pagamentos.forEach(pagamento => {
          if(pagamento.valor && pagamento.data) {
            console.log(`- Valor: R$${pagamento.valor.toFixed(2)} | Data: ${pagamento.data.toISOString()}`);
          }
        });
      }
      console.log('---');
    });
  }

  exibirPagamentosApt = (numero: number) => {
    let apartamento = this.apartamentos.find(ap => ap.numero === numero);
    if(apartamento) {
      console.log(`Pagamentos do apartamento ${apartamento.numero}:`);
      if(apartamento.pagamentos.length !== 0) {
        apartamento.pagamentos.forEach(pagamento => {
          if(pagamento.valor && pagamento.data) {
            console.log(`- Valor: R$${pagamento.valor.toFixed(2)} | Data: ${pagamento.data.toISOString()}`);
          }
        });
      } else {
        console.log("Sem pagamentos.");
      }
    } else {
      console.log("Apartamento não encontrado.");
    }
    console.log('---');
  }

  calcularBalanco = () => {
    let totalDespesas = this.condominio.despesas.reduce((total, despesa) => total + despesa.valor, 0);
    let totalReceitas = this.condominio.receitas.reduce((total, receita) => total + receita.valor, 0);
    return totalReceitas - totalDespesas
  }

  exibirContas = () => {
    console.log("Despesas:");
    if(this.condominio.despesas) {
      this.condominio.despesas.forEach(despesa => {
        if(despesa.nome && despesa.valor && despesa.data_emissao) {
          console.log(`- ${despesa.nome} => Valor: R$${despesa.valor.toFixed(2)} | Data: ${despesa.data_emissao.toISOString()}`);
        }
      });
    } else {
      console.log("- Nenhuma despesa registrada.");
    }
    console.log("---");
    console.log("Receitas:");
    if(this.condominio.receitas) {
      this.condominio.receitas.forEach(receita => {
        if(receita.nome && receita.valor && receita.data_emissao) {
          console.log(`- ${receita.nome} => Valor: R$${receita.valor.toFixed(2)} | Data: ${receita.data_emissao.toISOString()}`);
        }
      });
    } else {
      console.log("- Nenhuma receita registrada.");
    }
  }

}

const gestor:Gestor = new Gestor();

// Adicionando despesa
gestor.adicionarDespesa({nome: "Internet", valor: 50, data_emissao: new Date()});
gestor.adicionarDespesa({nome: "Limpeza", valor: 20, data_emissao: new Date()});

// Cadastrando Apartamento
gestor.cadastrarApartamento(101, "Pedro");
gestor.cadastrarApartamento(102, "José");

// Realizando Pagamento
gestor.realizarPagamento(101, 100, new Date('2024-07-05'), new Date('2024-06-05'));
gestor.realizarPagamento(102, 200, new Date('2024-07-05'), new Date('2024-04-21'));
gestor.realizarPagamento(102, 150, new Date('2024-07-05'), new Date('2024-02-03'));

// Mostrando pagamentos
gestor.exibirPagamentos();

// Mostrando pagamentos do apartamento pelo número
gestor.exibirPagamentosApt(102);

// Calculando balanço
console.log("balanço: ", gestor.calcularBalanco());

// Mostrando contas do condomínio
gestor.exibirContas();