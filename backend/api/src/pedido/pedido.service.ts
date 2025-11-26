import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pedido } from "./pedido.entity";
import { PedidoProducto } from "../pedido_producto/pedido_producto.entity";

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,

    @InjectRepository(PedidoProducto)
    private pedidoProductoRepo: Repository<PedidoProducto>,
  ) {}

  // Obtener todos los pedidos con sus productos
  findAll() {
    return this.pedidoRepo.find({
      relations: ['usuario', 'productos', 'productos.producto'],
      order: { fecha: 'DESC' }
    });
  }

  // Obtener un pedido concreto
  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id_pedido: id },
      relations: ['usuario', 'productos', 'productos.producto']
    });

    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    return pedido;
  }

  // Contar pedidos
  count() {
    return this.pedidoRepo.count();
  }

  // Calcular total de ventas
  async totalVentas() {
    const pedidos = await this.pedidoRepo.find();
    return pedidos.reduce((acc, p) => acc + Number(p.total), 0);
  }
}
