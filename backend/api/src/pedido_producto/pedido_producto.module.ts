import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoProducto } from './pedido_producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoProducto])],
  exports: [TypeOrmModule]
})
export class PedidoProductoModule {}
