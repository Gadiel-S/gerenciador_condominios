"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartamento = void 0;
const typeorm_1 = require("typeorm");
const divida_1 = require("./divida");
const pagamento_1 = require("./pagamento");
let Apartamento = class Apartamento {
};
exports.Apartamento = Apartamento;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 50 }),
    __metadata("design:type", String)
], Apartamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Apartamento.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Apartamento.prototype, "morador", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => divida_1.Divida, (divida) => divida.apartamento),
    __metadata("design:type", Array)
], Apartamento.prototype, "dividas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pagamento_1.Pagamento, (pagamento) => pagamento.apartamento),
    __metadata("design:type", Array)
], Apartamento.prototype, "pagamentos", void 0);
exports.Apartamento = Apartamento = __decorate([
    (0, typeorm_1.Entity)("apartamentos")
], Apartamento);
