import { DividaFactory } from "./factory/divida_factory";
import { Gestor } from "./gestor";

// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar corpos de requisição JSON
app.use(express.json());

const gestor = new Gestor(new DividaFactory());

// Endpoint para obter todos os usuários

//cadastro apartametno
app.post('/apartamento', (req, res) => {
  // usar o factory para criar o apartamento

  gestor.cadastrarApartamento(); // passar o apartamento aqui

  // res.json(apartamentoCadastrado);
});

//retorna todas as dividas de um apartamento
app.get('/apartamento/divida', (req, res) => {
  
  // res.json();
});


app.post('/apartamento/divida', (req, res) => {
  // usar o factory para criar o divida

  gestor.cadastrarDivida(); // passar o divida aqui
  // res.json(dividaCadastrada);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

/**
 fazer um serviço rest para usar o core - Gestor

 funcionalidades
  Cadastro
    apartamento
    divida
  
  Pagamento/Registro do pagamento da divida

  Lista
    Dividas do apartamento
    Apartamentos
  
  Consultar dados Gerais - Relatório de receitas e despesas

 */