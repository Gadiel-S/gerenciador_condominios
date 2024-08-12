"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./configuration/data_source");
const homepage_1 = __importDefault(require("./routes/homepage"));
const apartamentoRoutes_1 = __importDefault(require("./routes/apartamentoRoutes"));
const dividaRoutes_1 = __importDefault(require("./routes/dividaRoutes"));
const pagamentoRoutes_1 = __importDefault(require("./routes/pagamentoRoutes"));
const condominioRoutes_1 = __importDefault(require("./routes/condominioRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
app.use((0, cors_1.default)()); // Permite todas as origens
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', homepage_1.default);
app.use('/apartamento', apartamentoRoutes_1.default);
app.use('/divida', dividaRoutes_1.default);
app.use('/pagamento', pagamentoRoutes_1.default);
app.use('/condominio', condominioRoutes_1.default);
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
