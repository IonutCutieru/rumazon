import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { PedidoProducto } from '../pedido_producto/pedido_producto.entity';

@Entity('pedido')
export class Pedido {

  @PrimaryGeneratedColumn()
  id_pedido: number;

  @Column()
  id_usuario: number;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  metodo: string;

  @Column()
  estado: string;

  @Column()
  direccion: string;

  // Relación con usuario
  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  usuario: Usuario;

  // Relación con pedido_producto
  @OneToMany(() => PedidoProducto, pp => pp.pedido)
  pedidoProductos: PedidoProducto[];
}
