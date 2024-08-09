import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";
import { ApartamentoRepository } from "../repository/apartamento_repository";
import { DividaRepository } from "../repository/divida_repository";
import { PagamentoRepository } from "../repository/pagamento_repository";
import { CondominioRepository } from "../repository/condominio_repository";

const dividaRotas = Router();

const gestor = new Gestor(
  new ApartamentoRepository(),
  new DividaRepository(),
  new PagamentoRepository,
  new CondominioRepository()
);

dividaRotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
  try {
    const dividas = await gestor.listarDividas(req.params.idApartamento);
    res.status(200).send(dividas);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

dividaRotas.post('/cadastrar/:idApartamento', async (req: Request, res: Response) => {
  try {
    const divida = await gestor.cadastrarDivida(req.params.idApartamento, req.body);
    res.status(201).send(divida);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

dividaRotas.put('/atualizar/:idDivida', async (req: Request, res: Response) => {
  try {
    const divida = await gestor.atualizarDivida(req.params.idDivida, req.body);
    res.status(201).send(divida);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

dividaRotas.delete('/deletar/:idDivida', async (req: Request, res: Response) => {
  try {
    await gestor.deletarDivida(req.params.idDivida);
    res.status(200).send("Dívida deletada com sucesso!");
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

export default dividaRotas;