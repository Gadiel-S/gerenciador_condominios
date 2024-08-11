"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestor = void 0;
const validation_functions_1 = require("./validation_functions");
const validacoes = new validation_functions_1.Validacoes();
class Gestor {
    constructor(apartamentoRepository, dividaRepository, pagamentoRepository, condominioRepository) {
        this.apartamentoRepository = apartamentoRepository;
        this.dividaRepository = dividaRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.condominioRepository = condominioRepository;
    }
    // Apartamento Funções
    listarApartamentos() {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamentos = yield this.apartamentoRepository.buscarApartamentos();
            return apartamentos;
        });
    }
    buscarApartamento(numero) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield this.apartamentoRepository.buscarApartamentoPeloNumero(numero);
            return apartamento;
        });
    }
    cadastrarApartamento(apartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarApartamento(apartamento);
            const apt = yield this.apartamentoRepository.cadastrarApartamento(apartamento);
            return apt;
        });
    }
    atualizarApartamento(id, apartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarApartamento(apartamento, id);
            const apt = yield this.apartamentoRepository.atualizarApartamento(id, apartamento);
            return apt;
        });
    }
    deletarApartamento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.apartamentoRepository.deletarApartamento(id);
            return result;
        });
    }
    // Dívida Funções
    listarDividas(idApartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const dividas = yield this.dividaRepository.buscarDividas(idApartamento);
            return dividas;
        });
    }
    cadastrarDivida(idApartamento, divida) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarDivida(divida);
            const dividaCadastrada = yield this.dividaRepository.cadastrarDivida(idApartamento, divida);
            return dividaCadastrada;
        });
    }
    atualizarDivida(idDivida, divida) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarDivida(divida, idDivida);
            const dividaAtualizada = yield this.dividaRepository.atualizarDivida(idDivida, divida);
            return dividaAtualizada;
        });
    }
    deletarDivida(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dividaRepository.deletarDivida(id);
            return result;
        });
    }
    // Pagamento funções
    listarPagamentos(idApartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamentos = yield this.pagamentoRepository.buscarPagamentos(idApartamento);
            return pagamentos;
        });
    }
    registrarPagamentoDivida(idApartamento, idDivida, pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarPagamento(pagamento);
            const pagamentoCadastrado = yield this.pagamentoRepository.cadastrarPagamento(idApartamento, idDivida, pagamento);
            return pagamentoCadastrado;
        });
    }
    atualizarPagamento(idPagamento, pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarPagamento(pagamento, idPagamento);
            const pagamentoCadastrado = yield this.pagamentoRepository.atualizarPagamento(idPagamento, pagamento);
            return pagamentoCadastrado;
        });
    }
    deletarPagamento(idPagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pagamentoRepository.deletarPagamento(idPagamento);
            return result;
        });
    }
    // Condomínio funções
    calcularBalanco() {
        return __awaiter(this, void 0, void 0, function* () {
            const balanco = yield this.condominioRepository.calcularBalanco();
            return balanco;
        });
    }
    adicionarReceita(receita) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarReceitaDespesa(receita);
            const receitaAdicionada = this.condominioRepository.cadastrarReceita(receita);
            return receitaAdicionada;
        });
    }
    adicionarDespesa(despesa) {
        return __awaiter(this, void 0, void 0, function* () {
            validacoes.validarReceitaDespesa(despesa);
            const despesaAdicionada = yield this.condominioRepository.cadastrarDespesa(despesa);
            return despesaAdicionada;
        });
    }
    deletarReceita(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.condominioRepository.deletarReceita(id);
            return result;
        });
    }
    deletarDespesa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.condominioRepository.deletarDespesa(id);
            return result;
        });
    }
}
exports.Gestor = Gestor;
