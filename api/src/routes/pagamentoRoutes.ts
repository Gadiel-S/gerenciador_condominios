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

// const pagamentoRotas = Router();

// const gestor = new Gestor(
//   new ApartamentoRepository(),
//   new DividaRepository(),
//   new PagamentoRepository(),
//   new CondominioRepository()
// );

// pagamentoRotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
//   try {
//     const pagamentos = await gestor.listarPagamentos(req.params.idApartamento);
//     res.status(200).send(pagamentos);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// pagamentoRotas.post('/registrarPagamentoDivida/:idDivida/apartamento/:idApartamento', async (req: Request, res: Response) => {
//   try {
//     const pagamento = await gestor.registrarPagamentoDivida(req.params.idApartamento, req.params.idDivida, req.body);
//     res.status(201).send(pagamento);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// pagamentoRotas.put('/atualizar/:idPagamento', async (req: Request, res: Response) => {
//   try {
//     const pagamento = await gestor.atualizarPagamento(req.params.idPagamento, req.body);
//     res.status(201).send(pagamento);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// pagamentoRotas.delete('/deletar/:idPagamento', async (req: Request, res: Response) => {
//   try {
//     await gestor.deletarPagamento(req.params.idPagamento);
//     res.status(201).send("Pagamento deletado com sucesso!");
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// export default pagamentoRotas;