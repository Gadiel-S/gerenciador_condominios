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
const dividaRotas = (0, express_1.Router)();
const gestor = new gestor_1.Gestor(new apartamento_repository_1.ApartamentoRepository(), new divida_repository_1.DividaRepository(), new pagamento_repository_1.PagamentoRepository, new condominio_repository_1.CondominioRepository());
dividaRotas.get('/listar/:idApartamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dividas = yield gestor.listarDividas(req.params.idApartamento);
        res.status(200).send(dividas);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
dividaRotas.post('/cadastrar/:idApartamento', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const divida = yield gestor.cadastrarDivida(req.params.idApartamento, req.body);
        res.status(201).send(divida);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
dividaRotas.put('/atualizar/:idDivida', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const divida = yield gestor.atualizarDivida(req.params.idDivida, req.body);
        res.status(201).send(divida);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
dividaRotas.delete('/deletar/:idDivida', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gestor.deletarDivida(req.params.idDivida);
        res.status(200).send("Dívida deletada com sucesso!");
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
exports.default = dividaRotas;
