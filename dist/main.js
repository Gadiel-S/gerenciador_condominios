"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gestor_1 = require("./gestor");
const divida_factory_1 = require("./factory/divida_factory");
const apartamento_factory_1 = require("./factory/apartamento_factory");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)()); // Permite todas as origens
app.use(express_1.default.json());
const gestor = new gestor_1.Gestor(new divida_factory_1.DividaFactory(), new apartamento_factory_1.ApartamentoFactory());
// Tela inicial
app.get("/", (req, res) => {
    res.send("Sistema Gerenciador de condomínios");
});
// Lista de apartamentos
app.get("/apartamento", (req, res) => {
    res.json(gestor.apartamentos);
});
// Cadastro Apartamento
app.post("/apartamento", (req, res) => {
    try {
        const apartamento = gestor.cadastrarApartamento(req.body);
        //todo codigo a melhorar
        const dividaFactory = new divida_factory_1.DividaFactory();
        const dividas = dividaFactory.gerarDivida();
        gestor.cadastrarDivida(apartamento, dividas);
        res.json(apartamento);
    }
    catch (error) {
        res.status(409).json(JSON.parse(error.message));
    }
});
// Lista os pagamentos de um apartamento
app.get("/apartamento/:id_apartamento/pagamento/listar", (req, res) => {
    try {
        const dividas = gestor.listarPagamentosApartamento({ id_apartamento: req.params.id_apartamento });
        res.json(dividas);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
// Registro do pagamento da dívida
app.post("/apartamento/:id_apartamento/divida/:id_divida/registrarpagamento", (req, res) => {
    try {
        const divida = gestor.registrarPagamentoApartamento({ id_apartamento: req.params.id_apartamento, id_divida: req.params.id_divida });
        res.json(divida);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
// Lista das dívidas de um apartamento
app.get("/apartamento/:id_apartamento/dividas/listar", (req, res) => {
    try {
        const dividas = gestor.listarDividasApartamento({ id_apartamento: req.params.id_apartamento });
        res.json(dividas);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
});
// Cadastro dívida
app.post("/apartamento/dividas", (req, res) => {
    /**
     * Receber os ados da divida e cadastrar no apartamento
     */
    //todo codigo a melhorar
    //  const dividaFactory = new DividaFactory();
    //  const dividas = dividaFactory.gerarDivida();
    //  gestor.cadastrarDivida(apartamento, dividas);
    const apartamento = gestor.apartamentos.find((ap) => ap.id == req.body.id);
    if (apartamento) {
        const dividaFactory = new divida_factory_1.DividaFactory();
        const dividas = dividaFactory.gerarDivida();
        gestor.cadastrarDivida(apartamento, dividas);
        res.json(dividas);
    }
    else {
        res.json("Apartamento não encontrado.");
    }
});
// Relatório de receitas e despesas
app.get("/relatorio", (req, res) => {
    const receitas = gestor.condominio.receitas;
    const despesas = gestor.condominio.despesas;
    const balanco = gestor.calcularBalanco();
    const relatorio = {
        balanço: balanco,
        receitas: receitas,
        despesas: despesas,
    };
    res.json(relatorio);
});
// Adicionar despesa
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
