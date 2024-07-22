import { Despesa } from "../domain/types";

export type CriarDespesaProps = {
  nome: string,
  valor: number,
  data_emissao: Date
}

export class DespesaFactory {
  adiconarDespesa(props: CriarDespesaProps): Despesa{
    let despesa: Despesa = {
      nome: props.nome,
      valor: props.valor,
      data_emissao: props.data_emissao,
    }
    return despesa;
  }
}