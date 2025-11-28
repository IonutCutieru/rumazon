import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';

@Entity('usuario')
export class Usuario {

  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'comprador' })
  rol: string;

  // 👇 ESTA RELACIÓN ES LA QUE TE FALTABA
  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];
}

