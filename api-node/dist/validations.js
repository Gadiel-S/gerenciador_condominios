"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class Schemas {
}
_a = Schemas;
Schemas.apartamentoSchema = zod_1.z.object({
    numero: zod_1.z.number()
        .int()
        .positive(),
    morador: zod_1.z.string()
        .min(2),
});
Schemas.apartamentoAttSchema = _a.apartamentoSchema.partial().refine((apartamento) => Object.keys(apartamento).length > 0, {
    message: "Pelo menos um campo deve estar presente para atualização"
});
Schemas.dividaSchema = zod_1.z.object({
    valor: zod_1.z.number()
        .positive()
        .refine((valor) => _a.maxTwoDecimalPlaces(valor), {
        message: "O campo valor deve ter no máximo duas casas decimais"
    }),
    jurosAtrasoDiario: zod_1.z.number()
        .nonnegative()
        .max(9)
        .refine((juros) => _a.maxTwoDecimalPlaces(juros), {
        message: "O campo valor deve ter no máximo duas casas decimais"
    }),
    dataVencimento: zod_1.z.string()
        .refine((vencimento) => _a.isValidDate(vencimento), {
        message: "O campo dataVencimento deve ser uma data válida no formato 'yyyy/mm/dd/'"
    }),
    descricao: zod_1.z.string()
        .optional(),
});
Schemas.dividaAttSchema = _a.dividaSchema.partial().refine((divida) => Object.keys(divida).length > 0, {
    message: "Pelo menos um campo deve estar presente para atualização"
});
Schemas.pagamentoSchema = zod_1.z.object({
    valorPago: zod_1.z.number()
        .positive()
        .refine((valor) => _a.maxTwoDecimalPlaces(valor), {
        message: "O campo valorPago deve ter no máximo duas casas decimais"
    }),
    dataPagamento: zod_1.z.string()
        .refine((data) => _a.isValidDate(data), {
        message: "O campo dataPagamento deve ser uma data válida no formato 'yyyy/mm/dd/'"
    }),
    descricao: zod_1.z.string()
        .optional(),
});
Schemas.pagamentoAttSchema = _a.pagamentoSchema.partial().refine((pagamento) => Object.keys(pagamento).length > 0, {
    message: "Pelo menos um campo deve estar presente para atualização"
});
Schemas.receitaDespesaSchema = zod_1.z.object({
    nome: zod_1.z.string()
        .min(2),
    valor: zod_1.z.number()
        .positive()
        .refine((valor) => _a.maxTwoDecimalPlaces(valor), {
        message: "O campo valor deve ter no máximo duas casas decimais"
    }),
    dataEmissao: zod_1.z.string()
        .refine((data) => _a.isValidDate(data), {
        message: "O campo dataEmissao deve ser uma data válida no formato 'yyyy/mm/dd/'"
    }),
});
Schemas.receitaDespesaAttSchema = _a.receitaDespesaSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "Pelo menos um campo deve estar presente para atualização"
});
Schemas.isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString))
        return false;
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
};
Schemas.maxTwoDecimalPlaces = (value) => {
    const [integerPart, decimalPart] = value.toString().split('.');
    return decimalPart ? decimalPart.length <= 2 : true;
};
exports.default = Schemas;
