import express, { Request, Response } from "express";
import { Gestor } from "./gestor";
import { DividaFactory } from "./factory/divida_factory";
import { ApartamentoFactory } from "./factory/apartamento_factory";

import cors from "cors";
import { Divida } from "./domain/types";

const app = express();
const port = 3000;

app.use(cors()); // Permite todas as origens

app.use(express.json());

const gestor = new Gestor(new DividaFactory(), new ApartamentoFactory());

// Tela inicial
app.get("/", (req: Request, res: Response) => {
  res.send("Sistema Gerenciador de condomínios");
});

// Lista de apartamentos
app.get("/apartamento", (req: Request, res: Response) => {
  res.json(gestor.apartamentos);
});

// Cadastro Apartamento
app.post("/apartamento", (req: Request, res: Response) => {
  try {
    const apartamento = gestor.cadastrarApartamento(req.body);

    //todo codigo a melhorar
    const dividaFactory = new DividaFactory();
    const dividas = dividaFactory.gerarDivida();
    gestor.cadastrarDivida(apartamento, dividas);

    res.json(apartamento);
  } catch (error: any) {
    res.status(409).json(JSON.parse(error.message));
  }
});

// Lista os pagamentos de um apartamento
app.get("/apartamento/:id_apartamento/pagamento/listar", (req: Request, res: Response) => {
  try {
    const dividas = gestor.listarPagamentosApartamento({id_apartamento: req.params.id_apartamento});
    res.json(dividas);
  } catch (error: any) {
    res.status(404).json(error.message);
  }
});

// Registro do pagamento da dívida
app.post("/apartamento/:id_apartamento/divida/:id_divida/registrarpagamento", (req, res) => {
  
  try {
    const divida = gestor.registrarPagamentoApartamento({id_apartamento: req.params.id_apartamento, id_divida: req.params.id_divida});
    res.json(divida);
  } catch (error:any) {
    res.status(404).json(error.message);
  }
});

// Lista das dívidas de um apartamento
app.get("/apartamento/:id_apartamento/dividas/listar", (req: Request, res: Response) => {
  
  try {
    const dividas = gestor.listarDividasApartamento({id_apartamento: req.params.id_apartamento });
    res.json(dividas);
  } catch (error:any) {
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
    const dividaFactory = new DividaFactory();
    const dividas = dividaFactory.gerarDivida();
    gestor.cadastrarDivida(apartamento, dividas);
    res.json(dividas);
  } else {
    res.json("Apartamento não encontrado.");
  }
});

// Relatório de receitas e despesas
app.get("/relatorio", (req: Request, res: Response) => {
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
