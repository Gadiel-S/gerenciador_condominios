import { Router, Request, Response } from "express";
import { Gestor } from "../gestor";

export default class ApartamentoRotas{

  constructor(readonly gestor: Gestor, readonly rotas: Router){}

  criarRotas(){
    this.rotas.get('/listar', async (req: Request, res: Response) => {
      try {
        const apartamentos = await this.gestor.listarApartamentos();
        res.status(200).send(apartamentos);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    this.rotas.get('/buscar/:numero', async (req: Request, res: Response) => {
      try {
        const numero = Number(req.params.numero);
        if(isNaN(numero)) {
          return res.status(400).json({ error: 'O Parâmetro enviado deve ser um número válido.' });
        }
        const apartamento = await this.gestor.buscarApartamento(numero);
        res.status(200).send(apartamento);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    this.rotas.post('/cadastrar', async (req: Request, res: Response) => {
      try {
        const apartamento = await this.gestor.cadastrarApartamento(req.body);
        res.status(201).send(apartamento);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    this.rotas.put('/atualizar/:id', async (req: Request, res: Response) => {
      try {
        const apartamento = await this.gestor.atualizarApartamento(req.params.id, req.body);
        res.status(201).send(apartamento);
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    this.rotas.delete('/deletar/:id', async (req: Request, res: Response) => {
      try {
        await this.gestor.deletarApartamento(req.params.id);
        res.status(200).send("Apartamento deletado com sucesso!");
      } catch (error: any) {
        res.status(409).send({ message: error.message });
      }
    });

    return this.rotas;
  }
  
}


// const rotas = Router();

// const gestor = new Gestor(
//   new ApartamentoRepository(),
//   new DividaRepository(),
//   new PagamentoRepository(),
//   new CondominioRepository()
// );

// rotas.get('/listar', async (req: Request, res: Response) => {
//   try {
//     const apartamentos = await gestor.listarApartamentos();
//     res.status(200).send(apartamentos);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// rotas.get('/buscar/:numero', async (req: Request, res: Response) => {
//   try {
//     const numero = Number(req.params.numero);
//     if(isNaN(numero)) {
//       return res.status(400).json({ error: 'O Parâmetro enviado deve ser um número válido.' });
//     }
//     const apartamento = await gestor.buscarApartamento(numero);
//     res.status(200).send(apartamento);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// rotas.post('/cadastrar', async (req: Request, res: Response) => {
//   try {
//     const apartamento = await gestor.cadastrarApartamento(req.body);
//     res.status(201).send(apartamento);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// rotas.put('/atualizar/:id', async (req: Request, res: Response) => {
//   try {
//     const apartamento = await gestor.atualizarApartamento(req.params.id, req.body);
//     res.status(201).send(apartamento);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// rotas.delete('/deletar/:id', async (req: Request, res: Response) => {
//   try {
//     await gestor.deletarApartamento(req.params.id);
//     res.status(200).send("Apartamento deletado com sucesso!");
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });

// export default rotas;