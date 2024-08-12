import { AppDataSource } from "../configuration/data_source";
import { Apartamento } from "../entity/apartamento";
import { v4 as uuidv4 } from "uuid";
import { ApartamentoProps } from "../domain/types";

export class ApartamentoRepository {
  private apartamentoRepository = AppDataSource.getRepository(Apartamento);

  public async buscarApartamentos(): Promise<Apartamento[]> {
    return this.apartamentoRepository.find();
  }

  public async buscarApartamentoPeloId(id: string): Promise<Apartamento> {
    const apartamento = await this.apartamentoRepository.findOneBy({ id });
    if(apartamento) {
      return apartamento;
    } else {
      throw new Error("Apartamento não encontrado");
    }
  }

  public async buscarApartamentoPeloNumero(numero: number): Promise<Apartamento> {
    const apartamento = await this.apartamentoRepository.findOneBy({ numero });
    if(apartamento) {
      return apartamento;
    } else {
      throw new Error("Apartamento não encontrado");
    }
  }

  public async cadastrarApartamento(apartamento: ApartamentoProps): Promise<Apartamento> {
    const apartamentoNovo = new Apartamento();
    apartamentoNovo.id = uuidv4();
    apartamentoNovo.morador = apartamento.morador;
    const apartamentoJaCadastrado = await this.apartamentoRepository.findOneBy({ numero: apartamento.numero });
    if (apartamentoJaCadastrado) {
      throw new Error(`Número do apartamento já está em uso: ${apartamentoJaCadastrado}`);
    } else {
      apartamentoNovo.numero = apartamento.numero;
    }
    return this.apartamentoRepository.save(apartamentoNovo);
  }

  public async atualizarApartamento(id: string, apartamentoNovo: ApartamentoProps): Promise<Apartamento> {
    const apartamentoAnt = await this.buscarApartamentoPeloId(id);
    if(apartamentoNovo.morador) {
      apartamentoAnt.morador = apartamentoNovo.morador;
    }
    if(apartamentoNovo.numero) {
      const apartamentoJaCadastrado = await this.apartamentoRepository.findOneBy({ numero: apartamentoNovo.numero });
      if(apartamentoJaCadastrado) {
        throw new Error(`Número do apartamento já está em uso: ${apartamentoJaCadastrado}`);
      } else {
        apartamentoAnt.numero = apartamentoNovo.numero;
      }
    } 
    return this.apartamentoRepository.save(apartamentoAnt);
  }

  public async deletarApartamento(id: string): Promise<boolean> {
    await this.buscarApartamentoPeloId(id);
    const result = await this.apartamentoRepository.delete(id);
    const boolean = result.affected !== null && result.affected !== undefined && result.affected > 0;
    return boolean;
  }
}
