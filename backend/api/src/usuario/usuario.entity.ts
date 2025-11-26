import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  usuario: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'comprador' })
  rol: string;
}

