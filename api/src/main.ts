import express, { Router } from 'express';
import { AppDataSource } from './configuration/data_source';
import homepage from './routes/homepage';
import cors from "cors";

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

const gestor = new Gestor(
  new ApartamentoRepository(),
  new DividaRepository(),
  new PagamentoRepository(),
  new CondominioRepository()
);

app.use('/', homepage);
app.use('/apartamento', new ApartamentoRotas(gestor, Router()).criarRotas());
app.use('/divida', new DividaRotas(gestor, Router()).criarRotas());
app.use('/pagamento', new PagamentoRotas(gestor, Router()).criarRotas());
app.use('/condominio', new CondominioRotas(gestor, Router()).criarRotas());

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