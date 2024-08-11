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
exports.ApartamentoRepository = void 0;
const data_source_1 = require("../configuration/data_source");
const apartamento_1 = require("../entity/apartamento");
const uuid_1 = require("uuid");
class ApartamentoRepository {
    constructor() {
        this.apartamentoRepository = data_source_1.AppDataSource.getRepository(apartamento_1.Apartamento);
    }
    buscarApartamentos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apartamentoRepository.find();
        });
    }
    buscarApartamentoPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield this.apartamentoRepository.findOneBy({ id });
            if (apartamento) {
                return apartamento;
            }
            else {
                throw new Error("Apartamento não encontrado");
            }
        });
    }
    buscarApartamentoPeloNumero(numero) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamento = yield this.apartamentoRepository.findOneBy({ numero });
            if (apartamento) {
                return apartamento;
            }
            else {
                throw new Error("Apartamento não encontrado");
            }
        });
    }
    cadastrarApartamento(apartamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamentoNovo = new apartamento_1.Apartamento();
            apartamentoNovo.id = (0, uuid_1.v4)();
            apartamentoNovo.morador = apartamento.morador;
            const apartamentoJaCadastrado = yield this.apartamentoRepository.findOneBy({ numero: apartamento.numero });
            if (apartamentoJaCadastrado) {
                throw new Error(`Número do apartamento já está em uso: ${apartamentoJaCadastrado}`);
            }
            else {
                apartamentoNovo.numero = apartamento.numero;
            }
            return this.apartamentoRepository.save(apartamentoNovo);
        });
    }
    atualizarApartamento(id, apartamentoNovo) {
        return __awaiter(this, void 0, void 0, function* () {
            const apartamentoAnt = yield this.buscarApartamentoPeloId(id);
            if (apartamentoNovo.morador) {
                apartamentoAnt.morador = apartamentoNovo.morador;
            }
            if (apartamentoNovo.numero) {
                const apartamentoJaCadastrado = yield this.apartamentoRepository.findOneBy({ numero: apartamentoNovo.numero });
                if (apartamentoJaCadastrado) {
                    throw new Error(`Número do apartamento já está em uso: ${apartamentoJaCadastrado}`);
                }
                else {
                    apartamentoAnt.numero = apartamentoNovo.numero;
                }
            }
            return this.apartamentoRepository.save(apartamentoAnt);
        });
    }
    deletarApartamento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarApartamentoPeloId(id);
            const result = yield this.apartamentoRepository.delete(id);
            const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
            return boolean;
        });
    }
}
exports.ApartamentoRepository = ApartamentoRepository;
