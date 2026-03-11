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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestor = void 0;
const validations_1 = __importDefault(require("./validations"));
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
            validations_1.default.apartamentoSchema.parse(apartamento);
            const apt = yield this.apartamentoRepository.cadastrarApartamento(apartamento);
            return apt;
        });
    }
    atualizarApartamento(id, apartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validations_1.default.apartamentoAttSchema.parse(apartamento);
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
            validations_1.default.dividaSchema.parse(divida);
            const dividaCadastrada = yield this.dividaRepository.cadastrarDivida(idApartamento, divida);
            return dividaCadastrada;
        });
    }
    atualizarDivida(idDivida, divida) {
        return __awaiter(this, void 0, void 0, function* () {
            validations_1.default.dividaAttSchema.parse(divida);
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
            validations_1.default.pagamentoSchema.parse(pagamento);
            const pagamentoCadastrado = yield this.pagamentoRepository.cadastrarPagamento(idApartamento, idDivida, pagamento);
            return pagamentoCadastrado;
        });
    }
    atualizarPagamento(idPagamento, pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            validations_1.default.pagamentoAttSchema.parse(pagamento);
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
    listarReceitas() {
        return __awaiter(this, void 0, void 0, function* () {
            const receitas = yield this.condominioRepository.buscarReceitas();
            return receitas;
        });
    }
    listarPrimeirasReceitas(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const receitas = yield this.condominioRepository.buscarReceitas(limit);
            return receitas;
        });
    }
    listarDespesas() {
        return __awaiter(this, void 0, void 0, function* () {
            const despesas = yield this.condominioRepository.buscarDespesas();
            return despesas;
        });
    }
    listarPrimeirasDespesas(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const despesas = yield this.condominioRepository.buscarDespesas(limit);
            return despesas;
        });
    }
    adicionarReceita(receita) {
        return __awaiter(this, void 0, void 0, function* () {
            validations_1.default.receitaDespesaSchema.parse(receita);
            const receitaAdicionada = this.condominioRepository.cadastrarReceita(receita);
            return receitaAdicionada;
        });
    }
    adicionarDespesa(despesa) {
        return __awaiter(this, void 0, void 0, function* () {
            validations_1.default.receitaDespesaSchema.parse(despesa);
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
