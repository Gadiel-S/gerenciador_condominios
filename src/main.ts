import express, { Request, Response } from 'express';
import { Gestor } from "./gestor";
import { DividaFactory } from "./factory/divida_factory";
import { ApartamentoFactory } from './factory/apartamento_factory';

const app = express();
const port = 3000;

app.use(express.json());
const gestor = new Gestor(new DividaFactory());

// Tela inicial
app.get('/', (req: Request, res: Response) => {
  res.send('Sistema Gerenciador de condomínios');
});

// Lista de apartamentos
app.get('/apartamento', (req: Request, res: Response) => {
  res.json(gestor.apartamentos);
})

// Cadastro Apartamento
app.post('/apartamento', (req: Request, res: Response) => {
  const apartamentoFactory = new ApartamentoFactory();
  const pedroAp = apartamentoFactory.criarApartamento(101, "Pedro");
  gestor.cadastrarApartamento(pedroAp);
  res.json(pedroAp);
})

// Lista os pagamentos de um apartamento
app.get('/apartamento/pagamentos/:numeroAp', (req: Request, res: Response) => {
  const numeroAp = req.params.numeroAp;
  const apartamento = gestor.apartamentos.find(ap => ap.numero.toString() == numeroAp);
  if(apartamento) {
    res.json(apartamento.pagamentos);
  } else {
    res.json("Apartamento não encontrado.");
  }
});

// Lista das dívidas de um apartamento
app.get('/apartamento/dividas/:numeroAp', (req: Request, res: Response) => {
  const numeroAp = req.params.numeroAp;
  const apartamento = gestor.apartamentos.find(ap => ap.numero.toString() == numeroAp);
  if(apartamento) {
    res.json(apartamento.dividas);
  } else {
    res.json("Apartamento não encontrado.");
  }
});

// Cadastro dívida
app.post('/apartamento/dividas', (req, res) => {
  const apartamento = gestor.apartamentos.find(ap => ap.numero == 101);
  if(apartamento) {
    const dividaFactory = new DividaFactory();
    const dividas = dividaFactory.gerarDivida();
    gestor.cadastrarDivida(apartamento, dividas);
    res.json(dividas);
  } else {
    res.json("Apartamento não encontrado.");
  } 
});

// Registro do pagamento da dívida
app.post('/apartamento/dividas/:numeroAp', (req, res) => {
  const apartamento = gestor.apartamentos.find(ap => ap.numero == 101);
  if(apartamento) {
    const divida = apartamento.dividas.find(d => d.data_pagamento == null);
    if(divida) {
      gestor.registrarPagamento(apartamento, divida);
      res.json(divida);
    } else {
      res.json("Nenhuma dívida encontrada.");
    }
  } else {
    res.json("Apartamento não encontrado.");
  }
});

// Relatório de receitas e despesas
app.get('/relatorio', (req: Request, res: Response) => {
  const receitas = gestor.condominio.receitas;
  const despesas = gestor.condominio.despesas;
  const balanco = gestor.calcularBalanco();
  const relatorio = {
    balanço: balanco,
    receitas: receitas,
    despesas: despesas
  };
  res.json(relatorio);
});

// Adicionar despesa

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});