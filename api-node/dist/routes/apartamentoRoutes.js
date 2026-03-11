"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ApartamentoRotas {
    constructor(gestor, rotas) {
        this.gestor = gestor;
        this.rotas = rotas;
    }
    criarRotas() {
        this.rotas.get('/listar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apartamentos = yield this.gestor.listarApartamentos();
                res.status(200).send(apartamentos);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.get('/buscar/:numero', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const numero = Number(req.params.numero);
                if (isNaN(numero)) {
                    return res.status(400).json({ error: 'O Parâmetro enviado deve ser um número válido.' });
                }
                const apartamento = yield this.gestor.buscarApartamento(numero);
                res.status(200).send(apartamento);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.post('/cadastrar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apartamento = yield this.gestor.cadastrarApartamento(req.body);
                res.status(201).send(apartamento);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.put('/atualizar/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apartamento = yield this.gestor.atualizarApartamento(req.params.id, req.body);
                res.status(201).send(apartamento);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.delete('/deletar/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gestor.deletarApartamento(req.params.id);
                res.status(200).send("Apartamento deletado com sucesso!");
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        return this.rotas;
    }
}
exports.default = ApartamentoRotas;
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
