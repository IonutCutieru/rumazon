import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column()
  categoria: string;
}
