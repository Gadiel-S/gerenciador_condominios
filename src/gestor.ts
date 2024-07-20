import { DividaFactory } from "./factory/divida_factory";
import {
  Condominio,
  Despesa,
  Apartamento,
  Divida,
  Pagamento,
} from "./domain/types";
import {
  ApartamentoFactory,
  CriarApartamentoProps,
} from "./factory/apartamento_factory";

type ListarPagamentosApartamentoProps = {
  id_apartamento: string;
};

type RegistrarPagamentoApartamentoProps = {
  id_apartamento: string;
  id_divida: string;
};

type ListarDividasApartamento = { id_apartamento: string };

type BuscarApartamentoProps = { id_apartamento: string };

type BuscarDividaProps = { id_divida: string, id_apartamento: string}
type RemoverDividaApartamentoProps = {id_divida: string, id_apartamento: string}
type AdicionarReceitaCondominioProps = {id_divida: string, id_apartamento: string}


export class Gestor {
  condominio: Condominio;
  apartamentos: Apartamento[];

  private dividaFactory: DividaFactory;

  private apartamentoFactory: ApartamentoFactory;

  constructor(
    dividaFactory: DividaFactory,
    apartamentoFactory: ApartamentoFactory
  ) {
    this.condominio = {
      despesas: [],
      receitas: [],
    };
    this.apartamentos = [];
    this.dividaFactory = dividaFactory;
    this.apartamentoFactory = apartamentoFactory;
  }

  adicionarDespesa = (despesa: Despesa) => {
    this.condominio.despesas.push(despesa);
  };

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

    const apartamento =
      this.apartamentoFactory.criarApartamento(apartamentoProps);

    this.apartamentos.push(apartamento);

    return apartamento;
  };

  cadastrarDivida(apartamento: Apartamento, divida: Divida[]) {
    // const dividas: Divida[] = this.dividaFactory.gerarDivida();
    apartamento.dividas.push(...divida);
  }

  listarPagamentosApartamento(
    props: ListarPagamentosApartamentoProps
  ): Divida[] {
    
    const apartamento = this.buscarApartamento(props);

    if (apartamento) return apartamento.dividas.filter(divida => divida.data_pagamento != null);

    throw new Error("Apartamento não encontrado.");
  }

  registrarPagamentoApartamento = (
    props: RegistrarPagamentoApartamentoProps
  ): Divida => {
    
    const divida = this.removerDividaApartamento(props);

    return divida;
   
  };

  listarDividasApartamento(props: ListarDividasApartamento): Divida[] {
    return this.buscarApartamento(props).dividas;
  }

  
  private adicionarReceitaCondominio(props: AdicionarReceitaCondominioProps){
    // todo:Se a receita vir de uma doação, como resolver a receita?
    const divida = this.buscarDivida(props)

    if(!divida.data_pagamento) throw new Error("Pagamento da divida pendente.")

    this.condominio.receitas.push({
      nome: divida.descricao,
      valor: divida.valor,
      data_emissao: divida.data_pagamento ?? new Date(),
    });
  }

  removerDividaApartamento(props: RemoverDividaApartamentoProps) : Divida{
    const divida = this.buscarDivida(props);

    if(divida.data_pagamento != null) throw new Error(`Pagamento registrado no dia ${ divida.data_pagamento}` );

    const data_pagamento = new Date();
    divida.data_pagamento = data_pagamento;


    this.adicionarReceitaCondominio(props);
    return divida;
  }

  buscarDivida(props: BuscarDividaProps){
    const apartamento = this.buscarApartamento(props);

    const divida = apartamento.dividas.find((d) => d.id == props.id_divida);

    if(divida == null) throw new Error("Nenhuma dívida encontrada.");

    return divida;
  }

  buscarApartamento(props: BuscarApartamentoProps): Apartamento{

    const apartamento =  this.apartamentos.find(
      (ap) => ap.id == props.id_apartamento
    );
    
    if (apartamento) {
     return apartamento;
    } 
    
    throw new Error("Apartamento não encontrado.");
  }

  calcularBalanco = () => {
    let totalDespesas = this.condominio.despesas.reduce(
      (total, despesa) => total + despesa.valor,
      0
    );
    let totalReceitas = this.condominio.receitas.reduce(
      (total, receita) => total + receita.valor,
      0
    );
    return totalReceitas - totalDespesas;
  };
}
