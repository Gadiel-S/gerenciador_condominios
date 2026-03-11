import { DataSource } from "typeorm";
import { Apartamento } from "../entity/apartamento";
import { Divida } from "../entity/divida";
import { Pagamento } from "../entity/pagamento";
import { Receita } from "../entity/receita";
import { Despesa } from "../entity/despesa";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "webuser",
  password: process.env.DB_PASSWORD || "defaultpassword",
  database: process.env.DB_NAME || "condominios_gestao",
  synchronize: true,
  logging: false,
  entities: [Apartamento, Divida, Pagamento, Receita, Despesa],
  migrations: [],
  subscribers: [],
});