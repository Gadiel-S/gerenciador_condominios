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
exports.CondominioRepository = void 0;
const data_source_1 = require("../configuration/data_source");
const receita_1 = require("../entity/receita");
const despesa_1 = require("../entity/despesa");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
class CondominioRepository {
    constructor() {
        this.receitaRepository = data_source_1.AppDataSource.getRepository(receita_1.Receita);
        this.despesaRepository = data_source_1.AppDataSource.getRepository(despesa_1.Despesa);
    }
    buscarReceitas() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.receitaRepository.find();
        });
    }
    buscarDespesas() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.despesaRepository.find();
        });
    }
    buscarReceitaPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const receita = yield this.receitaRepository.findOneBy({ id });
            if (receita) {
                return receita;
            }
            else {
                throw new Error("Receita não encontrada");
            }
        });
    }
    buscarDespesaPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const despesa = yield this.despesaRepository.findOneBy({ id });
            if (despesa) {
                return despesa;
            }
            else {
                throw new Error("Despesa não encontrada");
            }
        });
    }
    calcularBalanco() {
        return __awaiter(this, void 0, void 0, function* () {
            const receitas = yield this.buscarReceitas();
            const despesas = yield this.buscarDespesas();
            const totalReceitas = receitas.reduce((acc, receita) => acc + Number(receita.valor), 0);
            const totalDespesas = despesas.reduce((acc, despesa) => acc + Number(despesa.valor), 0);
            const balanco = {
                balanco: totalReceitas - totalDespesas,
                receitas: receitas,
                despesas: despesas
            };
            return balanco;
        });
    }
    cadastrarReceita(receita) {
        return __awaiter(this, void 0, void 0, function* () {
            const receitaNova = new receita_1.Receita();
            receitaNova.id = (0, uuid_1.v4)();
            receitaNova.nome = receita.nome;
            receitaNova.valor = receita.valor;
            receitaNova.dataEmissao = (0, date_fns_1.parse)(receita.dataEmissao, "dd/mm/yyyy", new Date());
            return this.receitaRepository.save(receitaNova);
        });
    }
    cadastrarDespesa(despesa) {
        return __awaiter(this, void 0, void 0, function* () {
            const despesaNova = new despesa_1.Despesa();
            despesaNova.id = (0, uuid_1.v4)();
            despesaNova.nome = despesa.nome;
            despesaNova.valor = despesa.valor;
            despesaNova.dataEmissao = (0, date_fns_1.parse)(despesa.dataEmissao, "dd/mm/yyyy", new Date());
            return this.despesaRepository.save(despesaNova);
        });
    }
    deletarReceita(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarReceitaPeloId(id);
            const result = yield this.receitaRepository.delete(id);
            const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
            return boolean;
        });
    }
    deletarDespesa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarDespesaPeloId(id);
            const result = yield this.despesaRepository.delete(id);
            const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
            return boolean;
        });
    }
}
exports.CondominioRepository = CondominioRepository;
