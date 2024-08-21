import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";

export default class DividaRotas{

  constructor(readonly gestor: Gestor, readonly rotas: Router){}

  criarRotas(){
    this.rotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
      try {
        const dividas = await this.gestor.listarDividas(req.params.idApartamento);
        res.status(200).send(dividas);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.post('/cadastrar/:idApartamento', async (req: Request, res: Response) => {
      try {
        const divida = await this.gestor.cadastrarDivida(req.params.idApartamento, req.body);
        res.status(201).send(divida);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.put('/atualizar/:idDivida', async (req: Request, res: Response) => {
      try {
        const divida = await this.gestor.atualizarDivida(req.params.idDivida, req.body);
        res.status(201).send(divida);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });
    
    this.rotas.delete('/deletar/:idDivida', async (req: Request, res: Response) => {
      try {
        await this.gestor.deletarDivida(req.params.idDivida);
        res.status(200).send("Dívida deletada com sucesso!");
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    return this.rotas;
  }
}

// const dividaRotas = Router();

// const gestor = new Gestor(
//   new ApartamentoRepository(),
//   new DividaRepository(),
//   new PagamentoRepository,
//   new CondominioRepository()
// );

// dividaRotas.get('/listar/:idApartamento', async (req: Request, res: Response) => {
//   try {
//     const dividas = await gestor.listarDividas(req.params.idApartamento);
//     res.status(200).send(dividas);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// dividaRotas.post('/cadastrar/:idApartamento', async (req: Request, res: Response) => {
//   try {
//     const divida = await gestor.cadastrarDivida(req.params.idApartamento, req.body);
//     res.status(201).send(divida);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// dividaRotas.put('/atualizar/:idDivida', async (req: Request, res: Response) => {
//   try {
//     const divida = await gestor.atualizarDivida(req.params.idDivida, req.body);
//     res.status(201).send(divida);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// dividaRotas.delete('/deletar/:idDivida', async (req: Request, res: Response) => {
//   try {
//     await gestor.deletarDivida(req.params.idDivida);
//     res.status(200).send("Dívida deletada com sucesso!");
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// export default dividaRotas;