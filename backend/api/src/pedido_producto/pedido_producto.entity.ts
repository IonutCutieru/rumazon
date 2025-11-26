import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pedido } from "../pedido/pedido.entity";
import { Producto } from "../producto/producto.entity";

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

  @ManyToOne(() => Pedido, (pedido) => pedido.productos)
  pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.pedidos)
  producto: Producto;
}
