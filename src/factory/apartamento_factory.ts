import { Apartamento } from "../domain/types";
import { v4 as uuidv4 } from "uuid";

export type CriarApartamentoProps = {
  numero: number,
  morador: string
}

export class ApartamentoFactory {
  criarApartamento(props: CriarApartamentoProps): Apartamento{
    
    let apartamento: Apartamento = {
      numero: props.numero,
      morador: props.morador,
      id: uuidv4(),
      pagamentos: [],
      dividas: []
    }
    return apartamento;
  }
}
