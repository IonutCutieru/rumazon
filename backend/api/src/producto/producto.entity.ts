import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoProducto } from '../pedido_producto/pedido_producto.entity';

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

  @Column({ nullable: true })
  imagen: string;

  @OneToMany(() => PedidoProducto, pp => pp.producto)
  pedidoProductos: PedidoProducto[];
}


