
import {Divida } from "../domain/types";
import {differenceInDays} from "date-fns";

export class PagamentoGateway {

  recalcularDivida(pagamento: Date, divida: Divida): number{

    const diasAtraso = differenceInDays(pagamento, divida.data_vencimento);
    
    if(diasAtraso > 0) {
      
      let taxa = ((divida.valor * 0.01)/30)*diasAtraso;
      divida.valor+= taxa;

      return  divida.valor;
    }

    return  divida.valor;
  }

  pagar(pagamento: Date, divida: Divida, valorRecebido: number){
   
    const novoValor =  this.recalcularDivida(pagamento, divida);
    
    if(novoValor > valorRecebido){
      throw new Error("Valor pago inferior ao total da conta: "+novoValor);
    }

  }
}