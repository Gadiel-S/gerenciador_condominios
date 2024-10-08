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
exports.PagamentoRepository = void 0;
const data_source_1 = require("../configuration/data_source");
const apartamento_repository_1 = require("./apartamento_repository");
const divida_repository_1 = require("./divida_repository");
const condominio_repository_1 = require("./condominio_repository");
const pagamento_1 = require("../entity/pagamento");
const uuid_1 = require("uuid");
const apartamentoRepository = new apartamento_repository_1.ApartamentoRepository();
const dividaRepository = new divida_repository_1.DividaRepository();
const condominio_repository = new condominio_repository_1.CondominioRepository();
class PagamentoRepository {
    constructor() {
        this.pagamentoRepository = data_source_1.AppDataSource.getRepository(pagamento_1.Pagamento);
    }
    buscarPagamentos(idApartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield apartamentoRepository.buscarApartamentoPeloId(idApartamento);
            return yield this.pagamentoRepository.find({
                where: {
                    apartamento: {
                        id: idApartamento,
                    },
                },
                order: {
                    dataPagamento: 'ASC',
                },
            });
        });
    }
    buscarPagamentoPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamento = yield this.pagamentoRepository.findOneBy({ id });
            if (pagamento) {
                return pagamento;
            }
            else {
                throw new Error("Pagamento não foi encontrado");
            }
        });
    }
    cadastrarPagamento(idApartamento, idDivida, pagamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield apartamentoRepository.buscarApartamentoPeloId(idApartamento);
            // Criar pagamento
            const pagamentoNovo = new pagamento_1.Pagamento();
            pagamentoNovo.id = (0, uuid_1.v4)();
            pagamentoNovo.valorPago = pagamento.valorPago;
            pagamentoNovo.dataPagamento = new Date(pagamento.dataPagamento);
            pagamentoNovo.descricao = pagamento.descricao || '';
            pagamentoNovo.apartamento = apartamento;
            // Adicionar Receita
            const receita = {
                id: (0, uuid_1.v4)(),
                nome: `Pagamento do apartamento ${apartamento.numero}`,
                valor: pagamento.valorPago || 0,
                dataEmissao: pagamento.dataPagamento
            };
            // Deletar dívida
            yield dividaRepository.deletarDivida(idDivida);
            yield condominio_repository.cadastrarReceita(receita);
            return this.pagamentoRepository.save(pagamentoNovo);
        });
    }
    atualizarPagamento(idPagamento, pagamentoNovo) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamentoAnt = yield this.buscarPagamentoPeloId(idPagamento);
            if (pagamentoNovo.valorPago) {
                pagamentoAnt.valorPago = pagamentoNovo.valorPago;
            }
            if (pagamentoNovo.dataPagamento) {
                pagamentoAnt.dataPagamento = new Date(pagamentoNovo.dataPagamento);
            }
            if (pagamentoNovo.descricao) {
                pagamentoAnt.descricao = pagamentoNovo.descricao;
            }
            return this.pagamentoRepository.save(pagamentoAnt);
        });
    }
    deletarPagamento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPagamentoPeloId(id);
            const result = yield this.pagamentoRepository.delete(id);
            const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
            return boolean;
        });
    }
}
exports.PagamentoRepository = PagamentoRepository;
