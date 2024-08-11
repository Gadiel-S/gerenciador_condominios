import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";
import { ApartamentoRepository } from "../repository/apartamento_repository";
import { DividaRepository } from "../repository/divida_repository";
import { PagamentoRepository } from "../repository/pagamento_repository";
import { CondominioRepository } from "../repository/condominio_repository";

const pagamentoRotas = Router();

const gestor = new Gestor(
  new ApartamentoRepository(),
  new DividaRepository(),
  new PagamentoRepository(),
  new CondominioRepository()
);

pagamentoRotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
  try {
    const pagamentos = await gestor.listarPagamentos(req.params.idApartamento);
    res.status(200).send(pagamentos);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

pagamentoRotas.post('/registrarPagamentoDivida/:idDivida/apartamento/:idApartamento', async (req: Request, res: Response) => {
  try {
    const pagamento = await gestor.registrarPagamentoDivida(req.params.idApartamento, req.params.idDivida, req.body);
    res.status(201).send(pagamento);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

pagamentoRotas.put('/atualizar/:idPagamento', async (req: Request, res: Response) => {
  try {
    const pagamento = await gestor.atualizarPagamento(req.params.idPagamento, req.body);
    res.status(201).send(pagamento);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

pagamentoRotas.delete('/deletar/:idPagamento', async (req: Request, res: Response) => {
  try {
    await gestor.deletarPagamento(req.params.idPagamento);
    res.status(201).send("Pagamento deletado com sucesso!");
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

export default pagamentoRotas;