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
const express_1 = require("express");
const gestor_1 = require("../gestor");
const apartamento_repository_1 = require("../repository/apartamento_repository");
const divida_repository_1 = require("../repository/divida_repository");
const pagamento_repository_1 = require("../repository/pagamento_repository");
const condominio_repository_1 = require("../repository/condominio_repository");
const condominioRotas = (0, express_1.Router)();
const gestor = new gestor_1.Gestor(new apartamento_repository_1.ApartamentoRepository(), new divida_repository_1.DividaRepository(), new pagamento_repository_1.PagamentoRepository(), new condominio_repository_1.CondominioRepository());
condominioRotas.get('/balanco', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balanco = yield gestor.calcularBalanco();
        res.status(200).send(balanco);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
condominioRotas.post('/receita/adicionar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receita = yield gestor.adicionarReceita(req.body);
        res.status(201).send(receita);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
condominioRotas.post('/despesa/adicionar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const despesa = yield gestor.adicionarDespesa(req.body);
        res.status(201).send(despesa);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
condominioRotas.delete('/receita/deletar/:idReceita', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gestor.deletarReceita(req.params.idReceita);
        res.status(201).send("Receita deletada com sucesso!");
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
condominioRotas.delete('/despesa/deletar/:idDespesa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gestor.deletarDespesa(req.params.idDespesa);
        res.status(201).send("Despesa deletada com sucesso!");
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
exports.default = condominioRotas;
