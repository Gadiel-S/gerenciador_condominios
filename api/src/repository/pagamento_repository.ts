import { AppDataSource } from "../configuration/data_source";
import { ApartamentoRepository } from "./apartamento_repository";
import { DividaRepository } from "./divida_repository";
import { CondominioRepository } from "./condominio_repository";
import { Pagamento } from "../entity/pagamento";
import { PagamentoProps } from "../domain/types";
import { v4 as uuidv4 } from "uuid";

const apartamentoRepository = new ApartamentoRepository();
const dividaRepository = new DividaRepository();
const condominio_repository = new CondominioRepository();

export class PagamentoRepository {
  private pagamentoRepository = AppDataSource.getRepository(Pagamento);

  public async buscarPagamentos(idApartamento: string): Promise<Pagamento[]> {
    return await this.pagamentoRepository.find({
      where: {
        apartamento: {
          id: idApartamento,
        },
      },
      order: {
        dataPagamento: 'ASC',
      },
    });
  }

  public async buscarPagamentoPeloId(id: string): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOneBy({ id });
    if(pagamento) {
      return pagamento;
    } else {
      throw new Error("Pagamento não foi encontrado");
    }
  }

  public async cadastrarPagamento(idApartamento: string, idDivida: string, pagamento: PagamentoProps): Promise<Pagamento> {
    const apartamento = await apartamentoRepository.buscarApartamentoPeloId(idApartamento);
    // Criar pagamento
    const pagamentoNovo = new Pagamento();
    pagamentoNovo.id = uuidv4();
    pagamentoNovo.valorPago = pagamento.valorPago;
    pagamentoNovo.dataPagamento = new Date(pagamento.dataPagamento);
    pagamentoNovo.descricao = pagamento.descricao || '';
    pagamentoNovo.apartamento = apartamento
    // Adicionar Receita
    const receita = {
      id: uuidv4(),
      nome: `Pagamento do apartamento ${apartamento.numero}`,
      valor: pagamento.valorPago || 0,
      dataEmissao: pagamento.dataPagamento
    };
    // Deletar dívida
    await dividaRepository.deletarDivida(idDivida);
    await condominio_repository.cadastrarReceita(receita);
    return this.pagamentoRepository.save(pagamentoNovo);
  }

  public async atualizarPagamento(idPagamento: string, pagamentoNovo: PagamentoProps): Promise<Pagamento> {
    const pagamentoAnt = await this.buscarPagamentoPeloId(idPagamento);
    if(pagamentoNovo.valorPago) {
      pagamentoAnt.valorPago = pagamentoNovo.valorPago;
    }
    if(pagamentoNovo.dataPagamento) {
      pagamentoAnt.dataPagamento = new Date(pagamentoNovo.dataPagamento);
    }
    if(pagamentoNovo.descricao) {
      pagamentoAnt.descricao = pagamentoNovo.descricao
    }
    return this.pagamentoRepository.save(pagamentoAnt);
  }

  public async deletarPagamento(id: string): Promise<boolean> {
    await this.buscarPagamentoPeloId(id);
    const result = await this.pagamentoRepository.delete(id);
    const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
    return boolean;
  }

}