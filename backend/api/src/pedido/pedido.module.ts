import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pedido } from "./pedido.entity";
import { PedidoProducto } from "../pedido_producto/pedido_producto.entity";
import { PedidoService } from "./pedido.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoProducto])
  ],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
