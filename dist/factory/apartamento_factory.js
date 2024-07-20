"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartamentoFactory = void 0;
const uuid_1 = require("uuid");
class ApartamentoFactory {
    criarApartamento(props) {
        let apartamento = {
            numero: props.numero,
            morador: props.morador,
            id: (0, uuid_1.v4)(),
            pagamentos: [],
            dividas: []
        };
        return apartamento;
    }
}
exports.ApartamentoFactory = ApartamentoFactory;
