import {
  Condominio,
  Despesa,
  Apartamento,
  Divida
} from "./domain/types";
import { ApartamentoFactory, CriarApartamentoProps } from "./factory/apartamento_factory";
import { DividaFactory, CriarDividaProps } from "./factory/divida_factory";
import { DespesaFactory, CriarDespesaProps } from "./factory/despesa_factory";

type ListarDividasApartamentoProps = { id_apartamento: string };

type ListarPagamentosApartamentoProps = { id_apartamento: string; };

type RegistrarPagamentoApartamentoProps = { id_apartamento: string; id_divida: string; };

type RemoverDividaApartamentoProps = {id_divida: string, id_apartamento: string};

type AdicionarReceitaCondominioProps = {id_divida: string, id_apartamento: string};

type BuscarApartamentoProps = { id_apartamento: string };

type BuscarDividaProps = { id_divida: string, id_apartamento: string};


export class Gestor {
  condominio: Condominio;
  apartamentos: Apartamento[];

  private apartamentoFactory: ApartamentoFactory;
  private dividaFactory: DividaFactory;
  private despesaFactory: DespesaFactory;

  constructor(
    dividaFactory: DividaFactory,
    apartamentoFactory: ApartamentoFactory,
    despesaFactory: DespesaFactory
  ) {
    this.condominio = {
      despesas: [],
      receitas: [],
    };
    this.apartamentos = [];
    this.dividaFactory = dividaFactory;
    this.apartamentoFactory = apartamentoFactory;
    this.despesaFactory = despesaFactory;
  }

  cadastrarApartamento = (
    apartamentoProps: CriarApartamentoProps
  ): Apartamento => {
    const apartamentoJaCadastrado = this.apartamentos.find(
      (ap) => ap.numero == apartamentoProps.numero
    );

    if (apartamentoJaCadastrado) {
      const erro = JSON.stringify({
        apartamento: { ...apartamentoJaCadastrado },
        error: "Apartamento já cadastrado",
      });
      throw new Error(erro);
    }

    const apartamento = this.apartamentoFactory.criarApartamento(apartamentoProps);

    this.apartamentos.push(apartamento);

    return apartamento;
  };

  cadastrarDivida = (
    idApartamento: string,
    dividaProps: CriarDividaProps
  ): Divida => {
    const apartamento = this.buscarApartamento({id_apartamento: idApartamento});

    const divida = this.dividaFactory.criarDivida(dividaProps);

    apartamento.dividas.push(divida);

    return divida;
  };

  registrarPagamentoApartamento = (
    props: RegistrarPagamentoApartamentoProps
  ): Divida => {
    
    const divida = this.removerDividaApartamento(props);

    return divida;
   
  };

  removerDividaApartamento(props: RemoverDividaApartamentoProps): Divida{
    const divida = this.buscarDivida(props);

    if(divida.dataPagamento != null) throw new Error(`Pagamento registrado no dia ${ divida.dataPagamento}` );

    const data_pagamento = new Date();
    divida.dataPagamento = data_pagamento;

    this.adicionarReceitaCondominio(props);
    return divida;
  };

  private adicionarReceitaCondominio(props: AdicionarReceitaCondominioProps){
    // todo:Se a receita vir de uma doação, como resolver a receita?
    const divida = this.buscarDivida(props)

    if(!divida.dataPagamento) throw new Error("Pagamento da divida pendente.")

    this.condominio.receitas.push({
      nome: divida.descricao,
      valor: divida.valor,
      data_emissao: divida.dataPagamento ?? new Date(),
    });
  };

  listarDividasApartamento(props: ListarDividasApartamentoProps): Divida[] {
    return this.buscarApartamento(props).dividas;
  };

  listarPagamentosApartamento(
    props: ListarPagamentosApartamentoProps
  ): Divida[] {
    
    const apartamento = this.buscarApartamento(props);

    if (apartamento) return apartamento.dividas.filter(divida => divida.dataPagamento != null);

    throw new Error("Apartamento não encontrado.");
  };

  buscarApartamento(props: BuscarApartamentoProps): Apartamento{

    const apartamento =  this.apartamentos.find(
      (ap) => ap.id == props.id_apartamento
    );
    
    if (apartamento) {
     return apartamento;
    } 
    
    throw new Error("Apartamento não encontrado.");
  };

  buscarDivida(props: BuscarDividaProps){
    const apartamento = this.buscarApartamento(props);

    const divida = apartamento.dividas.find((d) => d.id == props.id_divida);

    if(divida == null) throw new Error("Nenhuma dívida encontrada.");

    return divida;
  };

  adicionarDespesa = (props: CriarDespesaProps): Despesa => {
    const despesa = this.despesaFactory.adiconarDespesa(props);
    this.condominio.despesas.push(despesa);
    return despesa;
  };

  calcularBalanco = () => {
    const totalDespesas = this.condominio.despesas.reduce(
      (total, despesa) => total + despesa.valor, 0
    );
    const totalReceitas = this.condominio.receitas.reduce(
      (total, receita) => total + receita.valor, 0
    );
    const balanco = {
      balanco: totalReceitas - totalDespesas,
      receitas: this.condominio.receitas,
      despesas: this.condominio.despesas
    };
    return balanco;
  };
}
