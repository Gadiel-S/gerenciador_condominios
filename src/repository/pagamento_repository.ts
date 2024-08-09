import { AppDataSource } from "../configuration/data_source";
import { ApartamentoRepository } from "./apartamento_repository";
import { DividaRepository } from "./divida_repository";
import { Pagamento } from "../entity/pagamento";
import { PagamentoProps } from "../domain/types";
import { v4 as uuidv4 } from "uuid";
import { Receita } from "../entity/receita";
import { parse } from 'date-fns';

const apartamentoRepository = new ApartamentoRepository();
const dividaRepository = new DividaRepository();

export class PagamentoRepository {
  private pagamentoRepository = AppDataSource.getRepository(Pagamento);

  public async buscarPagamentos(idApartamento: string): Promise<Pagamento[]> {
    const apartamento = await apartamentoRepository.buscarApartamentoPeloId(idApartamento);
    return await this.pagamentoRepository.find({
      where: {
        apartamento: apartamento,
      }
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
    pagamentoNovo.dataPagamento = parse(pagamento.dataPagamento, "dd/mm/yyyy", new Date());
    pagamentoNovo.descricao = pagamento.descricao || '';
    pagamentoNovo.apartamento = apartamento
    // Adicionar Receita e deletar divida
    const receita = new Receita();
    receita.id = uuidv4();
    receita.nome = `Pagamento do apartamento ${apartamento.numero}`;
    receita.valor = pagamento.valorPago || 0;
    receita.dataEmissao = parse(pagamento.dataPagamento, "dd/mm/yyyy", new Date()) || new Date();
    // Deletar dívida
    await dividaRepository.deletarDivida(idDivida);
    return this.pagamentoRepository.save(pagamentoNovo);
  }

  public async atualizarPagamento(idPagamento: string, pagamentoNovo: PagamentoProps): Promise<Pagamento> {
    const pagamentoAnt = await this.buscarPagamentoPeloId(idPagamento);
    if(pagamentoNovo.valorPago) {
      pagamentoAnt.valorPago = pagamentoNovo.valorPago;
    }
    if(pagamentoNovo.dataPagamento) {
      pagamentoAnt.dataPagamento = parse(pagamentoNovo.dataPagamento, "dd/mm/yyyy", new Date);
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