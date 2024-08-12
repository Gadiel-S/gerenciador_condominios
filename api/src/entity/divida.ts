import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Apartamento } from "./apartamento";

@Entity("dividas")
export class Divida {
  @PrimaryColumn('varchar', { length: 50 })
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor!: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 3,
  })
  jurosAtrasoDiario!: number;

  @Column('text', { nullable: true })
  descricao!: string;

  @Column('date')
  dataVencimento!: Date;

  @Column('date', { nullable: true })
  dataPagamento: Date | undefined;

  @ManyToOne(() => Apartamento, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'idApartamento' })
  apartamento!: Apartamento;

}