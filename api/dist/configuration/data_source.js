"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const apartamento_1 = require("../entity/apartamento");
const divida_1 = require("../entity/divida");
const pagamento_1 = require("../entity/pagamento");
const receita_1 = require("../entity/receita");
const despesa_1 = require("../entity/despesa");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "webuser",
    password: process.env.DB_PASSWORD || "defaultpassword",
    database: process.env.DB_NAME || "condominios_gestao",
    synchronize: true,
    logging: false,
    entities: [apartamento_1.Apartamento, divida_1.Divida, pagamento_1.Pagamento, receita_1.Receita, despesa_1.Despesa],
    migrations: [],
    subscribers: [],
});
