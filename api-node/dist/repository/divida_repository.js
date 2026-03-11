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
exports.DividaRepository = void 0;
const data_source_1 = require("../configuration/data_source");
const divida_1 = require("../entity/divida");
const apartamento_repository_1 = require("./apartamento_repository");
const uuid_1 = require("uuid");
const apartamentoRepository = new apartamento_repository_1.ApartamentoRepository();
class DividaRepository {
    constructor() {
        this.dividaRepository = data_source_1.AppDataSource.getRepository(divida_1.Divida);
    }
    buscarDividas(idApartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield apartamentoRepository.buscarApartamentoPeloId(idApartamento);
            return yield this.dividaRepository.find({
                where: {
                    apartamento: {
                        id: idApartamento,
                    },
                },
                order: {
                    dataVencimento: 'ASC',
                }
            });
        });
    }
    buscarDividaPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const divida = yield this.dividaRepository.findOneBy({ id });
            if (divida) {
                return divida;
            }
            else {
                throw new Error("Dívida não foi encontrada");
            }
        });
    }
    cadastrarDivida(idApartamento, divida) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield apartamentoRepository.buscarApartamentoPeloId(idApartamento);
            const dividaNova = new divida_1.Divida();
            dividaNova.id = (0, uuid_1.v4)();
            dividaNova.valor = divida.valor;
            dividaNova.jurosAtrasoDiario = divida.jurosAtrasoDiario;
            dividaNova.descricao = divida.descricao || '';
            dividaNova.dataVencimento = new Date(divida.dataVencimento);
            dividaNova.apartamento = apartamento;
            return this.dividaRepository.save(dividaNova);
        });
    }
    atualizarDivida(idDivida, dividaNova) {
        return __awaiter(this, void 0, void 0, function* () {
            const dividaAnt = yield this.buscarDividaPeloId(idDivida);
            if (dividaNova.valor) {
                dividaAnt.valor = dividaNova.valor;
            }
            if (dividaNova.jurosAtrasoDiario) {
                dividaAnt.jurosAtrasoDiario = dividaNova.jurosAtrasoDiario;
            }
            if (dividaNova.dataVencimento) {
                dividaAnt.dataVencimento = new Date(dividaNova.dataVencimento);
            }
            if (dividaNova.descricao) {
                dividaAnt.descricao = dividaNova.descricao;
            }
            return this.dividaRepository.save(dividaAnt);
        });
    }
    deletarDivida(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarDividaPeloId(id);
            const result = yield this.dividaRepository.delete(id);
            const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
            return boolean;
        });
    }
}
exports.DividaRepository = DividaRepository;
