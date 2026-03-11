import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";

export default class PagamentoRotas {

  constructor(readonly gestor: Gestor, readonly rotas: Router){}

  criarRotas(){
    this.rotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
      try {
        const pagamentos = await this.gestor.listarPagamentos(req.params.idApartamento);
        res.status(200).send(pagamentos);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.post('/registrarPagamentoDivida/:idDivida/apartamento/:idApartamento', async (req: Request, res: Response) => {
      try {
        const pagamento = await this.gestor.registrarPagamentoDivida(req.params.idApartamento, req.params.idDivida, req.body);
        res.status(201).send(pagamento);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.put('/atualizar/:idPagamento', async (req: Request, res: Response) => {
      try {
        const pagamento = await this.gestor.atualizarPagamento(req.params.idPagamento, req.body);
        res.status(201).send(pagamento);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.delete('/deletar/:idPagamento', async (req: Request, res: Response) => {
      try {
        await this.gestor.deletarPagamento(req.params.idPagamento);
        res.status(201).send("Pagamento deletado com sucesso!");
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    return this.rotas;
  }
}