"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividaFactory = void 0;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
class DividaFactory {
    gerarDivida() {
        let dividas = [];
        for (let mes = 1; mes <= 12; mes++) {
            // Avança para o próximo mês
            let dataVencimento = (0, date_fns_1.addMonths)(new Date(), mes);
            // definir o dia 05 de cada mes
            dataVencimento = (0, date_fns_1.set)(dataVencimento, { date: 5 });
            let divida = {
                valor: 50,
                data_vencimento: dataVencimento,
                descricao: "Condomínio",
                juros_atraso_diario: 0.01,
                id: (0, uuid_1.v4)()
            };
            dividas.push(divida);
        }
        return dividas;
    }
}
exports.DividaFactory = DividaFactory;
