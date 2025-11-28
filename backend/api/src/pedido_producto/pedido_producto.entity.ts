import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { Producto } from '../producto/producto.entity';

@Entity('pedido_producto')
export class PedidoProducto {

  @PrimaryGeneratedColumn()
  id_pedido_producto: number;

  @Column()
  id_pedido: number;

  @Column()
  id_producto: number;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  // Relación con pedido
  @ManyToOne(() => Pedido, pedido => pedido.pedidoProductos, {
    onDelete: 'CASCADE',
  })
  pedido: Pedido;

  // Relación con producto
  @ManyToOne(() => Producto, producto => producto.pedidoProductos, {
    onDelete: 'CASCADE',
  })
  producto: Producto;
}
