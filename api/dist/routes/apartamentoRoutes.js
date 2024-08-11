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
const apartamentoRotas = (0, express_1.Router)();
const gestor = new gestor_1.Gestor(new apartamento_repository_1.ApartamentoRepository(), new divida_repository_1.DividaRepository(), new pagamento_repository_1.PagamentoRepository(), new condominio_repository_1.CondominioRepository());
apartamentoRotas.get('/listar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartamentos = yield gestor.listarApartamentos();
        res.status(200).send(apartamentos);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
apartamentoRotas.get('/buscar/:numero', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numero = Number(req.params.numero);
        if (isNaN(numero)) {
            return res.status(400).json({ error: 'O Parâmetro enviado deve ser um número válido.' });
        }
        const apartamento = yield gestor.buscarApartamento(numero);
        res.status(200).send(apartamento);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
apartamentoRotas.post('/cadastrar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartamento = yield gestor.cadastrarApartamento(req.body);
        res.status(201).send(apartamento);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
apartamentoRotas.put('/atualizar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartamento = yield gestor.atualizarApartamento(req.params.id, req.body);
        res.status(201).send(apartamento);
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
apartamentoRotas.delete('/deletar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield gestor.deletarApartamento(req.params.id);
        res.status(200).send("Apartamento deletado com sucesso!");
    }
    catch (error) {
        res.status(409).send({ message: error.message });
    }
}));
exports.default = apartamentoRotas;
