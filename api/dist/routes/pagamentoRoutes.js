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
class PagamentoRotas {
    constructor(gestor, rotas) {
        this.gestor = gestor;
        this.rotas = rotas;
    }
    criarRotas() {
        this.rotas.get('/listar/:idApartamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pagamentos = yield this.gestor.listarPagamentos(req.params.idApartamento);
                res.status(200).send(pagamentos);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.post('/registrarPagamentoDivida/:idDivida/apartamento/:idApartamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pagamento = yield this.gestor.registrarPagamentoDivida(req.params.idApartamento, req.params.idDivida, req.body);
                res.status(201).send(pagamento);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.put('/atualizar/:idPagamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pagamento = yield this.gestor.atualizarPagamento(req.params.idPagamento, req.body);
                res.status(201).send(pagamento);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.delete('/deletar/:idPagamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gestor.deletarPagamento(req.params.idPagamento);
                res.status(201).send("Pagamento deletado com sucesso!");
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        return this.rotas;
    }
}
exports.default = PagamentoRotas;
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
