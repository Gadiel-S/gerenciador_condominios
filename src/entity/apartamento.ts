import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Divida } from "./divida";

@Entity("apartamentos")
export class Apartamento {
  @PrimaryColumn('varchar', { length: 50 })
  id!: string;

  @Column('int')
  numero!: number;

  @Column('varchar')
  morador!: string;

  @OneToMany(() => Divida, (divida) => divida.apartamento)
  dividas!: Divida[];

}