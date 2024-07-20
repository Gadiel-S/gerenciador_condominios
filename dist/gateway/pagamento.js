"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentoGateway = void 0;
const date_fns_1 = require("date-fns");
class PagamentoGateway {
    recalcularDivida(pagamento, divida) {
        const diasAtraso = (0, date_fns_1.differenceInDays)(pagamento, divida.data_vencimento);
        if (diasAtraso > 0) {
            let taxa = ((divida.valor * 0.01) / 30) * diasAtraso;
            divida.valor += taxa;
            return divida.valor;
        }
        return divida.valor;
    }
    pagar(pagamento, divida, valorRecebido) {
        const novoValor = this.recalcularDivida(pagamento, divida);
        if (novoValor > valorRecebido) {
            throw new Error("Valor pago inferior ao total da conta: " + novoValor);
        }
    }
}
exports.PagamentoGateway = PagamentoGateway;
