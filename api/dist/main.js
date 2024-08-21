"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const data_source_1 = require("./configuration/data_source");
const homepage_1 = __importDefault(require("./routes/homepage"));
const cors_1 = __importDefault(require("cors"));
const gestor_1 = require("./gestor");
const apartamento_repository_1 = require("./repository/apartamento_repository");
const divida_repository_1 = require("./repository/divida_repository");
const pagamento_repository_1 = require("./repository/pagamento_repository");
const condominio_repository_1 = require("./repository/condominio_repository");
const apartamentoRoutes_1 = __importDefault(require("./routes/apartamentoRoutes"));
const dividaRoutes_1 = __importDefault(require("./routes/dividaRoutes"));
const pagamentoRoutes_1 = __importDefault(require("./routes/pagamentoRoutes"));
const condominioRoutes_1 = __importDefault(require("./routes/condominioRoutes"));
const app = (0, express_1.default)();
const port = 4000;
app.use((0, cors_1.default)()); // Permite todas as origens
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const gestor = new gestor_1.Gestor(new apartamento_repository_1.ApartamentoRepository(), new divida_repository_1.DividaRepository(), new pagamento_repository_1.PagamentoRepository(), new condominio_repository_1.CondominioRepository());
app.use('/', homepage_1.default);
app.use('/apartamento', new apartamentoRoutes_1.default(gestor, (0, express_1.Router)()).criarRotas());
app.use('/divida', new dividaRoutes_1.default(gestor, (0, express_1.Router)()).criarRotas());
app.use('/pagamento', new pagamentoRoutes_1.default(gestor, (0, express_1.Router)()).criarRotas());
app.use('/condominio', new condominioRoutes_1.default(gestor, (0, express_1.Router)()).criarRotas());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Banco de dados conectado!');
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
});
