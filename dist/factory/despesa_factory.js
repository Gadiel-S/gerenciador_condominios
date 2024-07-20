"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DespesaFactory = void 0;
class DespesaFactory {
    adiconarDespesa(nome, valor, data_emissao) {
        let despesa = {
            nome: nome,
            valor: valor,
            data_emissao: data_emissao,
        };
        return despesa;
    }
}
exports.DespesaFactory = DespesaFactory;
