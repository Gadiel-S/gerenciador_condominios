import { Condominio, Despesa } from "./types";


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

class Gestor {
  condominio: Condominio;

  constructor(){
    this.condominio = {
      despesas: [],
      receitas: [],
    };
  }

  adicionarDespesa = (despesa: Despesa) => {
    this.condominio.despesas.push(despesa);
  }
}



const gestor:Gestor = new Gestor();

gestor.adicionarDespesa({nome: "internet", valor: 50, data_emissao: new Date()});




console.log("despensas2025 ", gestor.condominio)

