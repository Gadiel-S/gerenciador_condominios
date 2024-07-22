import { Divida } from "../domain/types";
import { v4 as uuidv4 } from "uuid";
// import { addMonths, set } from 'date-fns';

export type CriarDividaProps = {
  valor: number,
  dataVencimento: Date,
  descricao: string,
  jurosAtrasoDiario: number,
  dataPagamento?: Date
}

export class DividaFactory {
  criarDivida(props: CriarDividaProps): Divida{
    let divida: Divida = {
      id: uuidv4(),
      valor: props.valor,
      dataVencimento: props.dataVencimento,
      descricao: props.descricao,
      jurosAtrasoDiario: props.jurosAtrasoDiario,
      dataPagamento: props.dataPagamento
    };
    return divida;
  };
};

// export class DividaFactory{
//   gerarDivida(): Divida[] {
//     let dividas: Divida[] = [];

//     for(let mes = 1; mes <= 12; mes ++ ){
//       // Avança para o próximo mês
//       let dataVencimento = addMonths(new Date(), mes);

//       // definir o dia 05 de cada mes
//       dataVencimento = set(dataVencimento, { date: 5 });

//       let divida: Divida = {
//         valor: 50,
//         dataVencimento: dataVencimento,
//         descricao: "Condomínio",
//         jurosAtrasoDiario: 0.01,
//         id: uuidv4()
//       };

//       dividas.push(divida);
//     }
//     return dividas;
//   }
// }