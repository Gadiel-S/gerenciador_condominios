import { AppDataSource } from "../configuration/data_source";
import { Divida } from "../entity/divida";
import { ApartamentoRepository } from "./apartamento_repository";
import { DividaProps } from "../domain/types";
import { v4 as uuidv4 } from "uuid";
import { parse } from 'date-fns';

const apartamentoRepository = new ApartamentoRepository();

export class DividaRepository {
  private dividaRepository = AppDataSource.getRepository(Divida);

  public async buscarDividas(idApartamento: string): Promise<Divida[]> {
    const apartamento = await apartamentoRepository.buscarApartamentoPeloId(idApartamento);
    return await this.dividaRepository.find({
      where: {
        apartamento: apartamento,
      }
    });
  }

  public async buscarDividaPeloId(id: string): Promise<Divida> {
    const divida = await this.dividaRepository.findOneBy({ id });
    if(divida) {
      return divida;
    } else {
      throw new Error("Dívida não foi encontrada");
    }
  }

  public async cadastrarDivida(idApartamento: string, divida: DividaProps): Promise<Divida> {
    const apartamento = await apartamentoRepository.buscarApartamentoPeloId(idApartamento);
    const dividaNova = new Divida();
    dividaNova.id = uuidv4();
    dividaNova.valor = divida.valor;
    dividaNova.jurosAtrasoDiario = divida.jurosAtrasoDiario;
    dividaNova.descricao = divida.descricao || '';
    dividaNova.dataVencimento = parse(divida.dataVencimento, "dd/mm/yyyy", new Date());
    dividaNova.apartamento = apartamento;
    return this.dividaRepository.save(dividaNova);
  }

  public async atualizarDivida(idDivida: string, dividaNova: DividaProps): Promise<Divida> {
    const dividaAnt = await this.buscarDividaPeloId(idDivida);
    if(dividaNova.valor) {
      dividaAnt.valor = dividaNova.valor;
    }
    if(dividaNova.jurosAtrasoDiario) {
      dividaAnt.jurosAtrasoDiario = dividaNova.jurosAtrasoDiario;
    }
    if(dividaNova.dataVencimento) {
      dividaAnt.dataVencimento = parse(dividaNova.dataVencimento, "dd/mm/yyyy", new Date());
    }
    if(dividaNova.descricao) {
      dividaAnt.descricao = dividaNova.descricao;
    }
    return this.dividaRepository.save(dividaAnt);
  }

  public async deletarDivida(id: string): Promise<boolean> {
    await this.buscarDividaPeloId(id);
    const result = await this.dividaRepository.delete(id);
    const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
    return boolean;
  }

}