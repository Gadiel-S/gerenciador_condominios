import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("receitas")
export class Receita {
  @PrimaryColumn('varchar', { length: 50 })
  id!: string;

  @Column('varchar')
  nome!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor!: number;

  @Column('date')
  dataEmissao!: Date;

}