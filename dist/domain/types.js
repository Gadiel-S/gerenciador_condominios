"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartamento = void 0;
class Apartamento {
    constructor(numero, morador, dividas, id) {
        this.numero = numero;
        this.morador = morador;
        this.dividas = dividas;
        this.id = id;
    }
    pagamentos() {
        console.log("AQUI ", typeof (this));
        return this.dividas.filter(divida => divida.data_pagamento != null);
    }
}
exports.Apartamento = Apartamento;
