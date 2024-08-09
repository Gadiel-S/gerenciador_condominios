"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestor = void 0;
class Gestor {
    constructor(dividaFactory, apartamentoFactory) {
        this.adicionarDespesaCondominio = (despesa) => {
            this.condominio.despesas.push(despesa);
        };
        this.cadastrarApartamento = (apartamentoProps) => {
            const apartamentoJaCadastrado = this.apartamentos.find((ap) => ap.numero == apartamentoProps.numero);
            if (apartamentoJaCadastrado) {
                const erro = JSON.stringify({
                    apartamento: Object.assign({}, apartamentoJaCadastrado),
                    error: "Apartamento já cadastrado",
                });
                throw new Error(erro);
            }
            const apartamento = this.apartamentoFactory.criarApartamento(apartamentoProps);
            this.apartamentos.push(apartamento);
            return apartamento;
        };
        this.registrarPagamentoApartamento = (props) => {
            const divida = this.removerDividaApartamento(props);
            return divida;
        };
        this.calcularBalanco = () => {
            let totalDespesas = this.condominio.despesas.reduce((total, despesa) => total + despesa.valor, 0);
            let totalReceitas = this.condominio.receitas.reduce((total, receita) => total + receita.valor, 0);
            return totalReceitas - totalDespesas;
        };
        this.condominio = {
            despesas: [],
            receitas: [],
        };
        this.apartamentos = [];
        this.dividaFactory = dividaFactory;
        this.apartamentoFactory = apartamentoFactory;
    }
    cadastrarDivida(apartamento, divida) {
        // const dividas: Divida[] = this.dividaFactory.gerarDivida();
        apartamento.dividas.push(...divida);
    }
    listarPagamentosApartamento(props) {
        const apartamento = this.buscarApartamento(props);
        if (apartamento)
            return apartamento.pagamentos();
        throw new Error("Apartamento não encontrado.");
    }
    listarDividasApartamento(props) {
        return this.buscarApartamento(props).dividas;
    }
    adicionarReceitaCondominio(props) {
        var _a;
        // todo:Se a receita vir de uma doação, como resolver a receita?
        const divida = this.buscarDivida(props);
        if (!divida.data_pagamento)
            throw new Error("Pagamento da divida pendente.");
        this.condominio.receitas.push({
            nome: divida.descricao,
            valor: divida.valor,
            data_emissao: (_a = divida.data_pagamento) !== null && _a !== void 0 ? _a : new Date(),
        });
    }
    removerDividaApartamento(props) {
        const divida = this.buscarDivida(props);
        if (divida.data_pagamento != null)
            throw new Error(`Pagamento registrado no dia ${divida.data_pagamento}`);
        const data_pagamento = new Date();
        divida.data_pagamento = data_pagamento;
        this.adicionarReceitaCondominio(props);
        return divida;
    }
    buscarDivida(props) {
        const apartamento = this.buscarApartamento(props);
        const divida = apartamento.dividas.find((d) => d.id == props.id_divida);
        if (divida == null)
            throw new Error("Nenhuma dívida encontrada.");
        return divida;
    }
    buscarApartamento(props) {
        const apartamento = this.apartamentos.find((ap) => ap.id == props.id_apartamento);
        if (apartamento) {
            return apartamento;
        }
        throw new Error("Apartamento não encontrado.");
    }
}
exports.Gestor = Gestor;
