# Sistema de Gestão de Apartamentos

Este é um sistema full stack para gerenciar apartamentos e suas finanças. Desenvolvido com React, Node.js, Express, TypeScript, MySQL e TypeORM, o sistema permite o armazenamento e a manipulação de informações sobre apartamentos, pagamentos, dívidas e a administração de condomínios. O sistema possui uma tela de login que utiliza o Auth0, sendo necessário logar para acessá-lo.

## Funcionalidades

- **Gestão de Apartamentos**: Visualizar, adicionar e deletar apartamentos.
- **Controle de Dívidas e Pagamentos**: Monitorar e registrar dívidas e pagamentos associados a cada apartamento.
- **Gestão de Condomínio**: Visualizar e administrar as despesas e receitas do condomínio.
- **Autentização via Auth0**: Esse sistema utiliza o principal middleware de Login utilizado por grande parte dos sites do mercado, o Auth0, além de usá-lo para proteger todas as rotas da API.

## Tecnologias Utilizadas

### Front End

- Vite (Configuração do Projeto)
- React
- Typescript
- Auth0 (Autenticação)
- CSS

### Back End

- Node
- Express
- Typescript
- MySQL
- Typeorm
- Auth0 (Proteção de Rotas)