import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";
import { ApartamentoRepository } from "../repository/apartamento_repository";
import { DividaRepository } from "../repository/divida_repository";
import { PagamentoRepository } from "../repository/pagamento_repository";
import { CondominioRepository } from "../repository/condominio_repository";

const apartamentoRotas = Router();

const gestor = new Gestor(
  new ApartamentoRepository(),
  new DividaRepository(),
  new PagamentoRepository(),
  new CondominioRepository()
);

apartamentoRotas.get('/listar', async (req: Request, res: Response) => {
  try {
    const apartamentos = await gestor.listarApartamentos();
    res.status(200).send(apartamentos);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

apartamentoRotas.get('/buscar/:numero', async (req: Request, res: Response) => {
  try {
    const numero = Number(req.params.numero);
    if(isNaN(numero)) {
      return res.status(400).json({ error: 'O Parâmetro enviado deve ser um número válido.' });
    }
    const apartamento = await gestor.buscarApartamento(numero);
    res.status(200).send(apartamento);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

apartamentoRotas.post('/cadastrar', async (req: Request, res: Response) => {
  try {
    const apartamento = await gestor.cadastrarApartamento(req.body);
    res.status(201).send(apartamento);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

apartamentoRotas.put('/atualizar/:id', async (req: Request, res: Response) => {
  try {
    const apartamento = await gestor.atualizarApartamento(req.params.id, req.body);
    res.status(201).send(apartamento);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

apartamentoRotas.delete('/deletar/:id', async (req: Request, res: Response) => {
  try {
    await gestor.deletarApartamento(req.params.id);
    res.status(200).send("Apartamento deletado com sucesso!");
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
});

export default apartamentoRotas;