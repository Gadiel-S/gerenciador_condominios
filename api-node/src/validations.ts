import { z } from "zod";

class Schemas {
  static readonly apartamentoSchema = z.object({
    numero: z.number()
      .int()
      .positive(),
    morador: z.string()
      .min(2),
  });

  static readonly apartamentoAttSchema = this.apartamentoSchema.partial().refine(
    (apartamento) => Object.keys(apartamento).length > 0,
    {
      message: "Pelo menos um campo deve estar presente para atualização"
    }
  );

  static readonly dividaSchema = z.object({
    valor: z.number()
      .positive()
      .refine((valor) => this.maxTwoDecimalPlaces(valor), {
        message: "O campo valor deve ter no máximo duas casas decimais"
      }),
    jurosAtrasoDiario: z.number()
      .nonnegative()
      .max(9)
      .refine((juros) => this.maxTwoDecimalPlaces(juros), {
        message: "O campo valor deve ter no máximo duas casas decimais"
      }),
    dataVencimento: z.string()
      .refine((vencimento) => this.isValidDate(vencimento), {
        message: "O campo dataVencimento deve ser uma data válida no formato 'yyyy/mm/dd/'"
      }),
    descricao: z.string()
      .optional(),
  });

  static readonly dividaAttSchema = this.dividaSchema.partial().refine(
    (divida) => Object.keys(divida).length > 0,
    {
      message: "Pelo menos um campo deve estar presente para atualização"
    }
  );

  static readonly pagamentoSchema = z.object({
    valorPago: z.number()
      .positive()
      .refine((valor) => this.maxTwoDecimalPlaces(valor), {
        message: "O campo valorPago deve ter no máximo duas casas decimais"
      }),
    dataPagamento: z.string()
      .refine((data) => this.isValidDate(data), {
        message: "O campo dataPagamento deve ser uma data válida no formato 'yyyy/mm/dd/'"
      }),
    descricao: z.string()
      .optional(),
  });

  static readonly pagamentoAttSchema = this.pagamentoSchema.partial().refine(
    (pagamento) => Object.keys(pagamento).length > 0,
    {
       message: "Pelo menos um campo deve estar presente para atualização"
    }
  );

  static readonly receitaDespesaSchema = z.object({
    nome: z.string()
      .min(2),
    valor: z.number()
      .positive()
      .refine((valor) => this.maxTwoDecimalPlaces(valor), {
        message: "O campo valor deve ter no máximo duas casas decimais"
      }),
    dataEmissao: z.string()
      .refine((data) => this.isValidDate(data), {
        message: "O campo dataEmissao deve ser uma data válida no formato 'yyyy/mm/dd/'"
      }),
  });

  static readonly receitaDespesaAttSchema = this.receitaDespesaSchema.partial().refine(
    (value) => Object.keys(value).length > 0,
    {
       message: "Pelo menos um campo deve estar presente para atualização"
    }
  );

  private static isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
  
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
  
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  };

  private static maxTwoDecimalPlaces = (value: number) => {
    const [integerPart, decimalPart] = value.toString().split('.');
    return decimalPart ? decimalPart.length <= 2 : true;
  };
}

export default Schemas;