import { Despesa } from "../domain/types";

export class DespesaFactory {
  adiconarDespesa(nome: string, valor: number, data_emissao: Date): Despesa{
    let despesa: Despesa = {
      nome: nome,
      valor: valor,
      data_emissao: data_emissao,
    }
    return despesa;
  }
}