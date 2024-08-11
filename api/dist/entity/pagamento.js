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
exports.Pagamento = void 0;
const typeorm_1 = require("typeorm");
const apartamento_1 = require("./apartamento");
let Pagamento = class Pagamento {
};
exports.Pagamento = Pagamento;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 50 }),
    __metadata("design:type", String)
], Pagamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Pagamento.prototype, "valorPago", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Pagamento.prototype, "dataPagamento", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Pagamento.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => apartamento_1.Apartamento, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idApartamento' }),
    __metadata("design:type", apartamento_1.Apartamento)
], Pagamento.prototype, "apartamento", void 0);
exports.Pagamento = Pagamento = __decorate([
    (0, typeorm_1.Entity)("pagamentos")
], Pagamento);
