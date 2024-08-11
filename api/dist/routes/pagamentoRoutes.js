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
const pagamentoRotas = (0, express_1.Router)();
const gestor = new gestor_1.Gestor(new apartamento_repository_1.ApartamentoRepository(), new divida_repository_1.DividaRepository(), new pagamento_repository_1.PagamentoRepository(), new condominio_repository_1.CondominioRepository());
pagamentoRotas.get('/listar/:idApartamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamentos = yield gestor.listarPagamentos(req.params.idApartamento);
        res.status(200).send(pagamentos);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
pagamentoRotas.post('/registrarPagamentoDivida/:idDivida/apartamento/:idApartamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamento = yield gestor.registrarPagamentoDivida(req.params.idApartamento, req.params.idDivida, req.body);
        res.status(201).send(pagamento);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
pagamentoRotas.put('/atualizar/:idPagamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagamento = yield gestor.atualizarPagamento(req.params.idPagamento, req.body);
        res.status(201).send(pagamento);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
pagamentoRotas.delete('/deletar/:idPagamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gestor.deletarPagamento(req.params.idPagamento);
        res.status(201).send("Pagamento deletado com sucesso!");
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
exports.default = pagamentoRotas;
