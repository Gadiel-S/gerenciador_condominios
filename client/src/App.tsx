import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import Homepage from './pages/homepage';
import Apartamentos from './pages/apartamentos';
import ApartamentoCadastrar from './pages/cadastrarApartamento';
import './styles/App.css';
import Dividas from './pages/dividas';
import DividaCadastrar from './pages/cadastrarDivida';
import RegistrarPagamentoDivida from './pages/registrarPagamentoDivida';
import Pagamentos from './pages/pagamentos';
import Receitas from './pages/receitas';
import ReceitaAdicionar from './pages/adicionarReceita';
import Despesas from './pages/despesas';
import DespesaAdicionar from './pages/adicionarDespesa';
import Login from './pages/login';
import PrivateRoute from './components/privateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        {/* Rotas Protegidas */}
        <Route path="/" element={<PrivateRoute component={Homepage} />}></Route>
        <Route path="/apartamento/listar" element={<PrivateRoute component={Apartamentos} />}></Route>
        <Route path="/apartamento/cadastrar" element={<PrivateRoute component={ApartamentoCadastrar} />}></Route>
        <Route path="/divida/listar" element={<PrivateRoute component={Dividas} />}></Route>
        <Route path="/divida/cadastrar" element={<PrivateRoute component={DividaCadastrar} />}></Route>
        <Route path="/divida/registrarPagamento" element={<PrivateRoute component={RegistrarPagamentoDivida} />}></Route>
        <Route path="/pagamento/listar" element={<PrivateRoute component={Pagamentos} />}></Route>
        <Route path="/receita/listar" element={<PrivateRoute component={Receitas} />}></Route>
        <Route path="/despesa/listar" element={<PrivateRoute component={Despesas} />}></Route>
        <Route path="/receita/adicionar" element={<PrivateRoute component={ReceitaAdicionar} />}></Route>
        <Route path="/despesa/adicionar" element={<PrivateRoute component={DespesaAdicionar} />}></Route>
        {/* Rotas Protegidas */}

      </Routes>
    </Router>
  );
};

export default App;
