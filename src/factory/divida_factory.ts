import { Divida } from "../domain/types";
import { addMonths, set } from 'date-fns';

export class DividaFactory{
  gerarDivida(): Divida[] {
    let dividas: Divida[] = [];

    for(let mes = 1; mes <= 12; mes ++ ){
      // Avança para o próximo mês
      let dataVencimento = addMonths(new Date(), mes);

      // definir o dia 05 de cada mes
      dataVencimento = set(dataVencimento, { date: 5 });

      let divida: Divida = {
        valor: 50,
        data_vencimento: dataVencimento,
        descricao: "Comdomínio",
        juros_atraso_diario: 0.01,
      };

      dividas.push(divida);
    }
    return dividas;
  }
}