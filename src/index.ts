import express from 'express';
import { AppDataSource } from './configuration/data_source';
import homepage from './routes/homepage';
import apartamentoRotas from './routes/apartamentoRoutes';
import dividaRotas from './routes/dividaRoutes';
import pagamentoRotas from './routes/pagamentoRoutes';
import condominioRotas from './routes/condominioRoutes';
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors()); // Permite todas as origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homepage);
app.use('/apartamento', apartamentoRotas);
app.use('/divida', dividaRotas);
app.use('/pagamento', pagamentoRotas);
app.use('/condominio', condominioRotas);

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