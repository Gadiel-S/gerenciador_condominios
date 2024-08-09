import { DataSource } from "typeorm";
import { Apartamento } from "../entity/apartamento";
import { Divida } from "../entity/divida";
import { Pagamento } from "../entity/pagamento";
import { Receita } from "../entity/receita";
import { Despesa } from "../entity/despesa";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "webuser",
  password: "defaultpassword",
  database: "condominios_gestao",
  synchronize: true,
  logging: false,
  entities: [Apartamento, Divida, Pagamento, Receita, Despesa],
  migrations: [],
  subscribers: [],
});