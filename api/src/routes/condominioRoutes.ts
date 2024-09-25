import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";

export default class CondominioRotas{

  constructor(readonly gestor: Gestor, readonly rotas: Router){}

  criarRotas(){
    this.rotas.get('/balanco', async (req: Request, res: Response) => {
      try {
        const balanco = await this.gestor.calcularBalanco();
        res.status(200).send(balanco);
      } catch (error: any) {
        res.status(409).json({ message: error.message });
      }
    });
    
    this.rotas.get('/receita/listar', async (req: Request, res: Response) => {
      try {
        const receitas = await this.gestor.listarReceitas();
        res.status(200).send(receitas);
      } catch (error: any) {
        res.status(409).json({ message: error.message });
      }
    });

    this.rotas.get('/receita/listar/limitar/:limite', async (req: Request, res: Response) => {
      try {
        const limite = parseInt(req.params.limite as string, 10) || 5;
        const receitas = await this.gestor.listarPrimeirasReceitas(limite);
        res.status(200).send(receitas);
      } catch (error: any) {
        res.status(409).json({ message: error.message });
      }
    });
    
    this.rotas.get('/despesa/listar', async (req: Request, res: Response) => {
      try {
        const despesas = await this.gestor.listarDespesas();
        res.status(200).send(despesas);
      } catch (error: any) {
        res.status(409).json({ message: error.message });
      }
    });

    this.rotas.get('/despesa/listar/limitar/:limite', async (req: Request, res: Response) => {
      try {
        const limite = parseInt(req.params.limite as string, 10) || 5;
        const receitas = await this.gestor.listarPrimeirasDespesas(limite);
        res.status(200).send(receitas);
      } catch (error: any) {
        res.status(409).json({ message: error.message });
      }
    });
    
    this.rotas.post('/receita/adicionar', async (req: Request, res: Response) => {
      try {
        const receita = await this.gestor.adicionarReceita(req.body);
        res.status(201).send(receita);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.post('/despesa/adicionar', async (req: Request, res: Response) => {
      try {
        const despesa = await this.gestor.adicionarDespesa(req.body);
        res.status(201).send(despesa);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.delete('/receita/deletar/:idReceita', async (req: Request, res: Response) => {
      try {
        await this.gestor.deletarReceita(req.params.idReceita);
        res.status(201).send("Receita deletada com sucesso!");
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.delete('/despesa/deletar/:idDespesa', async (req: Request, res: Response) => {
      try {
        await this.gestor.deletarDespesa(req.params.idDespesa);
        res.status(201).send("Despesa deletada com sucesso!");
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    return this.rotas;
  }
}