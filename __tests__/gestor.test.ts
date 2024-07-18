
import { ApartamentoFactory } from "../src/factory/apartamento_factory";
import { DespesaFactory } from "../src/factory/despesa_factory";
import { Gestor } from "../src/gestor";
import { DividaFactory } from "../src/factory/divida_factory";

test("Deve instancia e validar se o registro do pagamento aconteceu", ()=> {
    
  const gestor = new Gestor(new DividaFactory());
  
  // Adicionando despesa
  const despesaFactory = new DespesaFactory();
  const Internet = despesaFactory.adiconarDespesa("Internet", 50, new Date());
  const Limpeza = despesaFactory.adiconarDespesa("Limpeza", 80, new Date());
  
  gestor.adicionarDespesa(Internet);
  gestor.adicionarDespesa(Limpeza);
  
  // Cadastrando Apartamento
  const apartamentoFactory = new ApartamentoFactory();
  const pedroAp = apartamentoFactory.criarApartamento(101, "Pedro");
  const joseAp = apartamentoFactory.criarApartamento(102, "José");
  
  gestor.cadastrarApartamento(pedroAp);
  gestor.cadastrarApartamento(joseAp);
  
  // Realizando Pagamento
  const pedroDivida = pedroAp.dividas.find(d => d.data_pagamento == null);
  const joseDivida = joseAp.dividas.find(d => d.data_pagamento == null);
  
  if(pedroDivida) gestor.registrarPagamento(pedroAp, pedroDivida);
  if(joseDivida) gestor.registrarPagamento(joseAp, joseDivida);

  expect(pedroDivida?.data_pagamento != null);

});