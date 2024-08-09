/* import express, { Request, Response } from "express";
import { Gestor } from "./gestor";
import { DividaFactory } from "./factory/divida_factory";
import { ApartamentoFactory } from "./factory/apartamento_factory";
import { DespesaFactory } from "./factory/despesa_factory";
import cors from "cors";

import ApartamentoRepository from "./repository/apartamento_repository";
import { AppDataSource } from "./configuration/data_source";
// import { ApartamentoEntity } from "./entity/apartamento";

const app = express();
const port = 3000;

app.use(cors()); // Permite todas as origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gestor = new Gestor(
  new ApartamentoFactory(),
  new ApartamentoRepository(),
  new DividaFactory(),
  new DespesaFactory()
);

// Tela inicial
app.get("/", (req: Request, res: Response) => {
  res.send("Sistema Gerenciador de condomínios");
});

// Listar apartamentos
app.get("/apartamento/listar", async (req: Request, res: Response) => {
  // const apartamentoRepository = AppDataSource.getRepository(ApartamentoEntity);
  const apartamentos = await apartamentoRepository.find();
  res.json(apartamentos);
});

// Cadastrar Apartamento
app.post("/apartamento/cadastrar", (req: Request, res: Response) => {
  try {
    const apartamento = gestor.cadastrarApartamento(req.body);
    res.json(apartamento);
  } catch (error: any) {
    res.status(409).json(JSON.parse(error.message));
  }
});

// Listar dívidas de um apartamento
app.get("/apartamento/:id_apartamento/dividas/listar", (req: Request, res: Response) => {
  try {
    const dividas = gestor.listarDividasApartamento({id_apartamento: req.params.id_apartamento });
    res.json(dividas);
  } catch (error:any) {
    res.status(404).json(error.message);
  }
  
});

// Cadastrar dívida
app.post("/apartamento/:id_apartamento/dividas/criar", (req, res) => {
  try {
    const divida = gestor.cadastrarDivida(req.params.id_apartamento, req.body);
    res.json(divida);
  } catch (error: any) {
    res.status(409).json(JSON.parse(error.message));
  };
});

// Listar pagamentos de um apartamento
app.get("/apartamento/:id_apartamento/pagamentos/listar", (req: Request, res: Response) => {
  try {
    const pagamentos = gestor.listarPagamentosApartamento({id_apartamento: req.params.id_apartamento});
    res.json(pagamentos);
  } catch (error: any) {
    res.status(404).json(error.message);
  }
});

// Registrar pagamento da dívida
app.post("/apartamento/:id_apartamento/dividas/:id_divida/registrarpagamento", (req, res) => {
  try {
    const divida = gestor.registrarPagamentoApartamento({id_apartamento: req.params.id_apartamento, id_divida: req.params.id_divida});
    res.json(divida);
  } catch (error:any) {
    res.status(404).json(error.message);
  }
});

// Balanço de receitas e despesas
app.get("/condominio/balanco", (req: Request, res: Response) => {
  const balanco = gestor.calcularBalanco();
  res.json(balanco);
});

// Adicionar despesa
app.post("/condominio/despesas/criar", (req: Request, res: Response) => {
  const despesa = gestor.adicionarDespesaCondominio(req.body);
  res.json(despesa);
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
*/