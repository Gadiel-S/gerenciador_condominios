import { Apartamento } from "../domain/types";
import { v4 as uuidv4 } from "uuid";

export class ApartamentoFactory {
  criarApartamento(numero: number, morador: string): Apartamento{
    let apartamento: Apartamento = {
      numero: numero,
      morador: morador,
      id: uuidv4(),
      pagamentos: [],
      dividas: []
    }

    return apartamento;
  }
}
