import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Apartamento } from "./apartamento";

@Entity("pagamentos")
export class Pagamento {
  @PrimaryColumn('varchar', { length: 50 })
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valorPago!: number;

  @Column('date')
  dataPagamento!: Date;

  @Column('text', { nullable: true })
  descricao: string | undefined;

  @ManyToOne(() => Apartamento, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'idApartamento' })
  apartamento!: Apartamento;

}