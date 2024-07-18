const express = require('express');
const app = express();
const port = 3000; // Escolha a porta que deseja utilizar para sua API

// Exemplo de rota GET
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Exemplo de rota POST
app.post('/', (req, res) => {
  res.send('Testando!');
});


// Exemplo de rota POST
app.post('/api/exemplo', (req, res) => {
  res.send('Rota POST acessada');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});