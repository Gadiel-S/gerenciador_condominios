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
class DividaRotas {
    constructor(gestor, rotas) {
        this.gestor = gestor;
        this.rotas = rotas;
    }
    criarRotas() {
        this.rotas.get('/listar/:idApartamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dividas = yield this.gestor.listarDividas(req.params.idApartamento);
                res.status(200).send(dividas);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.post('/cadastrar/:idApartamento', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const divida = yield this.gestor.cadastrarDivida(req.params.idApartamento, req.body);
                res.status(201).send(divida);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.put('/atualizar/:idDivida', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const divida = yield this.gestor.atualizarDivida(req.params.idDivida, req.body);
                res.status(201).send(divida);
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        this.rotas.delete('/deletar/:idDivida', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gestor.deletarDivida(req.params.idDivida);
                res.status(200).send("Dívida deletada com sucesso!");
            }
            catch (error) {
                res.status(409).send({ message: error.message });
            }
        }));
        return this.rotas;
    }
}
exports.default = DividaRotas;
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
