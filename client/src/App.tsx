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
import Condominio from './pages/condominio';
import Receitas from './pages/receitas';
import ReceitaAdicionar from './pages/adicionarReceita';
import Despesas from './pages/despesas';
import DespesaAdicionar from './pages/adicionarDespesa';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/apartamento/listar" element={<Apartamentos />}></Route>
        <Route path="/apartamento/cadastrar" element={<ApartamentoCadastrar />}></Route>
        <Route path="/divida/listar" element={<Dividas />}></Route>
        <Route path="/divida/cadastrar" element={<DividaCadastrar />}></Route>
        <Route path="/divida/registrarPagamento" element={<RegistrarPagamentoDivida />}></Route>
        <Route path="/pagamento/listar" element={<Pagamentos />}></Route>
        <Route path="/condominio/balanco" element={<Condominio />}></Route>
        <Route path="/receita/listar" element={<Receitas />}></Route>
        <Route path="/despesa/listar" element={<Despesas />}></Route>
        <Route path="/receita/adicionar" element={<ReceitaAdicionar />}></Route>
        <Route path="/despesa/adicionar" element={<DespesaAdicionar />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
