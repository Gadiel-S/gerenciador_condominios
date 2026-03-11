import express, { Router } from 'express';
import { AppDataSource } from './configuration/data_source';
import homepage from './routes/homepage';
import cors from "cors";
import helmet from 'helmet';
import { checkJwt } from './authz/check-jwt';
import { Gestor } from "./gestor";
import { ApartamentoRepository } from "./repository/apartamento_repository";
import { DividaRepository } from "./repository/divida_repository";
import { PagamentoRepository } from "./repository/pagamento_repository";
import { CondominioRepository } from "./repository/condominio_repository";
import ApartamentoRotas from './routes/apartamentoRoutes';
import DividaRotas from './routes/dividaRoutes';
import PagamentoRotas from './routes/pagamentoRoutes';
import CondominioRotas from './routes/condominioRoutes';

const app = express();
const port = 4000;

app.use(cors()); // Permite todas as origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const createRouter = () => {
  const router = Router();
  router.use(checkJwt);
  return router;
};

const apartamentoRouter = createRouter();
const dividaRouter = createRouter();
const pagamentoRouter = createRouter();
const condominioRouter = createRouter();

const gestor = new Gestor(
  new ApartamentoRepository(),
  new DividaRepository(),
  new PagamentoRepository(),
  new CondominioRepository()
);

app.use('/', homepage);
app.use('/apartamento', new ApartamentoRotas(gestor, apartamentoRouter).criarRotas());
app.use('/divida', new DividaRotas(gestor, dividaRouter).criarRotas());
app.use('/pagamento', new PagamentoRotas(gestor, pagamentoRouter).criarRotas());
app.use('/condominio', new CondominioRotas(gestor, condominioRouter).criarRotas());

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
  });