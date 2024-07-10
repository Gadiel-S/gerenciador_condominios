import { Apartamento } from "../domain/types";

export class ApartamentoFactory {
  criarApartamento(numero: number, morador: string): Apartamento{
    let apartamento: Apartamento = {
      numero: numero,
      morador: morador,
      pagamentos: [],
      dividas: []
    }

    return apartamento;
  }
}
