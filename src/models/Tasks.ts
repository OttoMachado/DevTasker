import { Entity, PrimaryGeneratedColumn, Column, TableForeignKey, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Tasks {
  //Cria o ID
  @PrimaryGeneratedColumn()
  id!: number;

  //Cria Titulo 
  @Column({ type: "varchar", length: 100, nullable: false })
  title: string;

  //Cria descrição
  @Column({ type: "varchar", length: 100, nullable: false })
  description: string;

  //Cria Status
  @Column({ type: "varchar", length: 30, nullable: false })
  status: string;

  //Cria Data de entrega
  @Column({ type: "varchar", length: 50, nullable: false })
  deliverydate: string;

  @ManyToOne(() => User) //relação ManyToOne com a entidade User, o parametro ta dizendo qual a entidade q vai ser relacionada.
  @JoinColumn({ name: "userid"})  //isso aqui define qual coluna da tabela vai ser a chave estrangeira.
  user: User;



  constructor(title: string, description: string, status: string, deliverydate: string, userid: number){
    this.title = title;
    this.description = description;
    this.status = status;
    this.deliverydate = deliverydate;
  }
}
