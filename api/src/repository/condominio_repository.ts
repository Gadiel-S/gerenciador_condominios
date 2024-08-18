import { AppDataSource } from "../configuration/data_source";
import { Receita } from "../entity/receita";
import { Despesa } from "../entity/despesa";
import { CondominioProps } from "../domain/types";
import { v4 as uuidv4 } from "uuid";
import { parse } from 'date-fns';

export class CondominioRepository {
  private receitaRepository = AppDataSource.getRepository(Receita);
  private despesaRepository = AppDataSource.getRepository(Despesa);

  public async buscarReceitas(): Promise<Receita[]> {
    return this.receitaRepository.find();
  }

  public async buscarDespesas(): Promise<Despesa[]> {
    return this.despesaRepository.find();
  }

  public async buscarReceitaPeloId(id: string): Promise<Receita> {
    const receita = await this.receitaRepository.findOneBy({ id });
    if(receita) {
      return receita;
    } else {
      throw new Error("Receita não encontrada");
    }
  }

  public async buscarDespesaPeloId(id: string): Promise<Despesa> {
    const despesa = await this.despesaRepository.findOneBy({ id });
    if(despesa) {
      return despesa;
    } else {
      throw new Error("Despesa não encontrada");
    }
  }

  public async calcularBalanco() {
    const receitas = await this.buscarReceitas();
    const despesas = await this.buscarDespesas();
    const totalReceitas = receitas.reduce((acc, receita) => acc + Number(receita.valor), 0);
    const totalDespesas = despesas.reduce((acc, despesa) => acc + Number(despesa.valor), 0);
    const balanco = {
      balanco: totalReceitas - totalDespesas
    }
    return balanco;
  }

  public async cadastrarReceita(receita: CondominioProps): Promise<Receita> {
    const receitaNova = new Receita();
    receitaNova.id = uuidv4();
    receitaNova.nome = receita.nome;
    receitaNova.valor = receita.valor;
    receitaNova.dataEmissao = parse(receita.dataEmissao, "dd/mm/yyyy", new Date());
    return this.receitaRepository.save(receitaNova);
  }

  public async cadastrarDespesa(despesa: CondominioProps): Promise<Receita> {
    const despesaNova = new Despesa();
    despesaNova.id = uuidv4();
    despesaNova.nome = despesa.nome;
    despesaNova.valor = despesa.valor;
    despesaNova.dataEmissao = parse(despesa.dataEmissao, "dd/mm/yyyy", new Date());
    return this.despesaRepository.save(despesaNova);
  }

  public async deletarReceita(id: string): Promise<boolean> {
    await this.buscarReceitaPeloId(id);
    const result = await this.receitaRepository.delete(id);
    const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
    return boolean;
  }

  public async deletarDespesa(id: string): Promise<boolean> {
    await this.buscarDespesaPeloId(id);
    const result = await this.despesaRepository.delete(id);
    const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
    return boolean;
  }

}