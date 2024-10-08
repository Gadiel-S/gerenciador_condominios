"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validacoes = void 0;
const date_fns_1 = require("date-fns");
class Validacoes {
    validarApartamento(apartamento, id) {
        if (!id) {
            // Validações para cadastrar apartamento
            if (!this.possuiTodasPropriedades(apartamento, ['numero', 'morador'])) {
                throw new Error("Propriedades do apartamento faltando");
            }
            if (typeof apartamento.numero !== 'number') {
                throw new Error("A propriedade 'numero' deve ser do tipo number");
            }
            if (typeof apartamento.morador !== 'string') {
                throw new Error("A propriedade 'morador' deve ser do tipo string");
            }
        }
        else {
            // Validações para atualizar apartamento
            if (!this.possuiUmaPropriedade(apartamento, ['numero', 'morador'])) {
                throw new Error("Pelo menos uma propriedade deve estar presente para atualização");
            }
            if (apartamento.numero && typeof apartamento.numero !== 'number') {
                throw new Error("A propriedade 'numero' deve ser do tipo number");
            }
            if (apartamento.morador && typeof apartamento.morador !== 'string') {
                throw new Error("A propriedade 'morador' deve ser do tipo string");
            }
        }
    }
    validarDivida(divida, id) {
        if (!id) {
            // Validações para cadastrar dívida
            if (!this.possuiTodasPropriedades(divida, ['valor', 'jurosAtrasoDiario', 'dataVencimento'])) {
                throw new Error("Propriedades da dívida faltando");
            }
            if (typeof divida.valor !== 'number') {
                throw new Error("A propriedade 'valor' deve ser do tipo number");
            }
            if (typeof divida.jurosAtrasoDiario !== 'number') {
                throw new Error("A propriedade 'jurosAtrasoDiario' deve ser do tipo number");
            }
            if (divida.descricao && typeof divida.descricao !== 'string') {
                throw new Error("A propriedade 'descricao' deve ser do tipo string");
            }
            if (typeof divida.dataVencimento !== 'string' || !this.isValidDate(divida.dataVencimento)) {
                throw new Error("A propriedade 'dataVencimento' deve ser uma data válida no formato dd/mm/yyyy");
            }
        }
        else {
            // Validações para atualizar dívida
            if (!this.possuiUmaPropriedade(divida, ['valor', 'jurosAtrasoDiario', 'dataVencimento', 'descricao'])) {
                throw new Error("Pelo menos uma propriedade deve estar presente para atualização");
            }
            if (divida.valor && typeof divida.valor !== 'number') {
                throw new Error("A propriedade 'valor' deve ser do tipo number");
            }
            if (divida.jurosAtrasoDiario && typeof divida.jurosAtrasoDiario !== 'number') {
                throw new Error("A propriedade 'jurosAtrasoDiario' deve ser do tipo number");
            }
            if (divida.dataVencimento && typeof divida.dataVencimento !== 'string' && !this.isValidDate(divida.dataVencimento)) {
                throw new Error("A propriedade 'dataVencimento' deve ser uma data válida no formato dd/mm/yyyy");
            }
            if (divida.descricao && typeof divida.descricao !== 'string') {
                throw new Error("A propriedade 'descricao' deve ser do tipo string");
            }
        }
    }
    validarPagamento(pagamento, id) {
        if (!id) {
            // Validações para cadastrar pagamento
            if (!this.possuiTodasPropriedades(pagamento, ['valorPago', 'dataPagamento'])) {
                throw new Error("Propriedades do pagamento faltando");
            }
            if (typeof pagamento.valorPago !== 'number') {
                throw new Error("A propriedade 'valorPago' deve ser do tipo number");
            }
            if (typeof pagamento.dataPagamento !== 'string' || !this.isValidDate(pagamento.dataPagamento)) {
                throw new Error("A propriedade 'dataPagamento' deve ser uma data válida no formato dd/mm/yyyy");
            }
            if (pagamento.descricao && typeof pagamento.descricao !== 'string') {
                throw new Error("A propriedade 'descricao' deve ser do tipo string");
            }
        }
        else {
            // Validações para atualizar pagamento
            if (!this.possuiUmaPropriedade(pagamento, ['valorPago', 'dataPagamento', 'descricao'])) {
                throw new Error("Pelo menos uma propriedade deve estar presente para atualização");
            }
            if (pagamento.valorPago && typeof pagamento.valorPago !== 'number') {
                throw new Error("A propriedade 'valorPago' deve ser do tipo number");
            }
            if (pagamento.dataPagamento && typeof pagamento.dataPagamento !== 'string' && !this.isValidDate(pagamento.dataPagamento)) {
                throw new Error("A propriedade 'dataPagamento' deve ser uma data válida no formato dd/mm/yyyy");
            }
            if (pagamento.descricao && typeof pagamento.descricao !== 'string') {
                throw new Error("A propriedade 'descricao' deve ser do tipo string");
            }
        }
    }
    validarReceitaDespesa(props) {
        if (!this.possuiTodasPropriedades(props, ['nome', 'valor', 'dataEmissao'])) {
            throw new Error("Propriedades faltando");
        }
        if (typeof props.nome !== 'string') {
            throw new Error("A propriedade 'nome' deve ser do tipo string");
        }
        if (typeof props.valor !== 'number') {
            throw new Error("A propriedade 'valor' deve ser do tipo number");
        }
        if (typeof props.dataEmissao !== 'string' || !this.isValidDate(props.dataEmissao)) {
            throw new Error("A propriedade 'dataEmissao' deve ser uma data válida no formato dd/mm/yyyy");
        }
    }
    possuiUmaPropriedade(obj, properties) {
        return properties.some(prop => obj[prop] !== undefined && obj[prop] !== null);
    }
    possuiTodasPropriedades(obj, properties) {
        return properties.every(prop => obj[prop] !== undefined && obj[prop] !== null);
    }
    isValidDate(dateString) {
        const date = (0, date_fns_1.parse)(dateString, "dd/mm/yyyy", new Date());
        return (0, date_fns_1.isValid)(date);
    }
}
exports.Validacoes = Validacoes;
