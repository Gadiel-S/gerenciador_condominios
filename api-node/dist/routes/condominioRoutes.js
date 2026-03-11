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
class CondominioRotas {
    constructor(gestor, rotas) {
        this.gestor = gestor;
        this.rotas = rotas;
    }
    criarRotas() {
        this.rotas.get('/balanco', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const balanco = yield this.gestor.calcularBalanco();
                res.status(200).send(balanco);
            }
            catch (error) {
                res.status(409).json({ message: error.message });
            }
        }));
        this.rotas.get('/receita/listar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const receitas = yield this.gestor.listarReceitas();
                res.status(200).send(receitas);
            }
            catch (error) {
                res.status(409).json({ message: error.message });
            }
        }));
        this.rotas.get('/receita/listar/limitar/:limite', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const limite = parseInt(req.params.limite, 10) || 5;
                const receitas = yield this.gestor.listarPrimeirasReceitas(limite);
                res.status(200).send(receitas);
            }
            catch (error) {
                res.status(409).json({ message: error.message });
            }
        }));
        this.rotas.get('/despesa/listar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const despesas = yield this.gestor.listarDespesas();
                res.status(200).send(despesas);
            }
            catch (error) {
                res.status(409).json({ message: error.message });
            }
        }));
        this.rotas.get('/despesa/listar/limitar/:limite', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const limite = parseInt(req.params.limite, 10) || 5;
                const receitas = yield this.gestor.listarPrimeirasDespesas(limite);
                res.status(200).send(receitas);
            }
            catch (error) {
                res.status(409).json({ message: error.message });
            }
        }));
        this.rotas.post('/receita/adicionar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const receita = yield this.gestor.adicionarReceita(req.body);
                res.status(201).send(receita);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.post('/despesa/adicionar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const despesa = yield this.gestor.adicionarDespesa(req.body);
                res.status(201).send(despesa);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.delete('/receita/deletar/:idReceita', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gestor.deletarReceita(req.params.idReceita);
                res.status(201).send("Receita deletada com sucesso!");
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.delete('/despesa/deletar/:idDespesa', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gestor.deletarDespesa(req.params.idDespesa);
                res.status(201).send("Despesa deletada com sucesso!");
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        return this.rotas;
    }
}
exports.default = CondominioRotas;
// const condominioRotas = Router();
// const gestor = new Gestor(
//   new ApartamentoRepository(),
//   new DividaRepository(),
//   new PagamentoRepository(),
//   new CondominioRepository()
// );
// condominioRotas.get('/balanco', async (req: Request, res: Response) => {
//   try {
//     const balanco = await gestor.calcularBalanco();
//     res.status(200).send(balanco);
//   } catch (error: any) {
//     res.status(409).json({ message: error.message });
//   }
// });
// condominioRotas.get('/receita/listar', async (req: Request, res: Response) => {
//   try {
//     const receitas = await gestor.listarReceitas();
//     res.status(200).send(receitas);
//   } catch (error: any) {
//     res.status(409).json({ message: error.message });
//   }
// });
// condominioRotas.get('/despesa/listar', async (req: Request, res: Response) => {
//   try {
//     const despesas = await gestor.listarDespesas();
//     res.status(200).send(despesas);
//   } catch (error: any) {
//     res.status(409).json({ message: error.message });
//   }
// });
// condominioRotas.post('/receita/adicionar', async (req: Request, res: Response) => {
//   try {
//     const receita = await gestor.adicionarReceita(req.body);
//     res.status(201).send(receita);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });
// condominioRotas.post('/despesa/adicionar', async (req: Request, res: Response) => {
//   try {
//     const despesa = await gestor.adicionarDespesa(req.body);
//     res.status(201).send(despesa);
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });
// condominioRotas.delete('/receita/deletar/:idReceita', async (req: Request, res: Response) => {
//   try {
//     await gestor.deletarReceita(req.params.idReceita);
//     res.status(201).send("Receita deletada com sucesso!");
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });
// condominioRotas.delete('/despesa/deletar/:idDespesa', async (req: Request, res: Response) => {
//   try {
//     await gestor.deletarDespesa(req.params.idDespesa);
//     res.status(201).send("Despesa deletada com sucesso!");
//   } catch (error: any) {
//     res.status(409).send({ message: error.message });
//   }
// });
// export default condominioRotas;
