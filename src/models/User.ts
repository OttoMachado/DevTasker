import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tasks } from "./Tasks";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 30, nullable: false })
  creationDate: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  email: string;

  @OneToMany(() => Tasks, (task)  => task.user)   //OneToMany do Tasks pra User
  tasks: Tasks[];

  constructor(name : string, email: string, creationDate: string, password: string){
    this.name = name;
    this.email = email;
    this.creationDate = creationDate
    this.password = password
  }
}
