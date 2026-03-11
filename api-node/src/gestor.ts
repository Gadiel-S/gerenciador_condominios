import { ApartamentoRepository } from "./repository/apartamento_repository";
import { DividaRepository } from "./repository/divida_repository";
import { PagamentoRepository } from "./repository/pagamento_repository";
import { CondominioRepository } from "./repository/condominio_repository";
import { Apartamento } from "./entity/apartamento";
import { Divida } from "./entity/divida";
import { Pagamento } from "./entity/pagamento";
import { Receita } from "./entity/receita";
import { Despesa } from "./entity/despesa";
import { ApartamentoProps, DividaProps, PagamentoProps, CondominioProps } from "./domain/types";
import Schemas from "./validations";

export class Gestor {
  private apartamentoRepository: ApartamentoRepository;
  private dividaRepository: DividaRepository;
  private pagamentoRepository: PagamentoRepository;
  private condominioRepository: CondominioRepository;
  constructor(
    apartamentoRepository: ApartamentoRepository,
    dividaRepository: DividaRepository,
    pagamentoRepository: PagamentoRepository,
    condominioRepository: CondominioRepository
  ) {
    this.apartamentoRepository = apartamentoRepository;
    this.dividaRepository = dividaRepository;
    this.pagamentoRepository = pagamentoRepository;
    this.condominioRepository = condominioRepository;
  }

  // Apartamento Funções
  async listarApartamentos(): Promise<Apartamento[]> {
    const apartamentos = await this.apartamentoRepository.buscarApartamentos();
    return apartamentos;
  }

  async buscarApartamento(numero: number): Promise<Apartamento> {
    const apartamento = await this.apartamentoRepository.buscarApartamentoPeloNumero(numero);
    return apartamento;
  }

  async cadastrarApartamento(apartamento: ApartamentoProps): Promise<Apartamento> {
    Schemas.apartamentoSchema.parse(apartamento);
    const apt = await this.apartamentoRepository.cadastrarApartamento(apartamento);
    return apt;
  }

  async atualizarApartamento(id: string, apartamento: ApartamentoProps): Promise<Apartamento> {
    Schemas.apartamentoAttSchema.parse(apartamento);
    const apt = await this.apartamentoRepository.atualizarApartamento(id, apartamento);
    return apt;
  }

  async deletarApartamento(id: string): Promise<boolean> {
    const result = await this.apartamentoRepository.deletarApartamento(id);
    return result;
  }

  // Dívida Funções
  async listarDividas(idApartamento: string): Promise<Divida[]> {
    const dividas = await this.dividaRepository.buscarDividas(idApartamento);
    return dividas;
  }

  async cadastrarDivida(idApartamento: string, divida: DividaProps): Promise<Divida> {
    Schemas.dividaSchema.parse(divida);
    const dividaCadastrada = await this.dividaRepository.cadastrarDivida(idApartamento, divida);
    return dividaCadastrada;
  }

  async atualizarDivida(idDivida: string, divida: DividaProps): Promise<Divida> {
    Schemas.dividaAttSchema.parse(divida);
    const dividaAtualizada = await this.dividaRepository.atualizarDivida(idDivida, divida);
    return dividaAtualizada;
  }

  async deletarDivida(id: string): Promise<boolean> {
    const result = await this.dividaRepository.deletarDivida(id);
    return result;
  }

  // Pagamento funções
  async listarPagamentos(idApartamento: string): Promise<Pagamento[]> {
    const pagamentos = await this.pagamentoRepository.buscarPagamentos(idApartamento);
    return pagamentos;
  }

  async registrarPagamentoDivida(idApartamento: string, idDivida: string, pagamento: PagamentoProps): Promise<Pagamento> {
    Schemas.pagamentoSchema.parse(pagamento);
    const pagamentoCadastrado = await this.pagamentoRepository.cadastrarPagamento(idApartamento, idDivida, pagamento);
    return pagamentoCadastrado;
  }

  async atualizarPagamento(idPagamento: string, pagamento: PagamentoProps): Promise<Pagamento> {
    Schemas.pagamentoAttSchema.parse(pagamento);
    const pagamentoCadastrado = await this.pagamentoRepository.atualizarPagamento(idPagamento, pagamento);
    return pagamentoCadastrado;
  }

  async deletarPagamento(idPagamento: string): Promise<boolean> {
    const result = await this.pagamentoRepository.deletarPagamento(idPagamento);
    return result;
  }

  // Condomínio funções
  async calcularBalanco() {
    const balanco = await this.condominioRepository.calcularBalanco();
    return balanco;
  }

  async listarReceitas(): Promise<Receita[]> {
    const receitas = await this.condominioRepository.buscarReceitas();
    return receitas;
  }

  async listarPrimeirasReceitas(limit: number): Promise<Receita[]> {
    const receitas = await this.condominioRepository.buscarReceitas(limit);
    return receitas;
  }

  async listarDespesas(): Promise<Despesa[]> {
    const despesas = await this.condominioRepository.buscarDespesas();
    return despesas;
  }

  async listarPrimeirasDespesas(limit: number): Promise<Despesa[]> {
    const despesas = await this.condominioRepository.buscarDespesas(limit);
    return despesas;
  }

  async adicionarReceita(receita: CondominioProps): Promise<Receita> {
    Schemas.receitaDespesaSchema.parse(receita);
    const receitaAdicionada = this.condominioRepository.cadastrarReceita(receita);
    return receitaAdicionada;
  }

  async adicionarDespesa(despesa: CondominioProps): Promise<Despesa> {
    Schemas.receitaDespesaSchema.parse(despesa);
    const despesaAdicionada = await this.condominioRepository.cadastrarDespesa(despesa);
    return despesaAdicionada;
  }

  async deletarReceita(id: string): Promise<boolean> {
    const result = await this.condominioRepository.deletarReceita(id);
    return result;
  }

  async deletarDespesa(id: string): Promise<boolean> {
    const result = await this.condominioRepository.deletarDespesa(id);
    return result;
  }

}