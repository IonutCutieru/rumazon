import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { PedidoProducto } from '../pedido_producto/pedido_producto.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadisticasAdminService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoProducto) private ppRepo: Repository<PedidoProducto>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  async getAllStats() {
    const totalUsuarios = await this.usuarioRepo.count();
    const totalPedidos = await this.pedidoRepo.count();

    const pedidos = await this.pedidoRepo.find();
    const totalVentas = pedidos.reduce((sum, p) => sum + Number(p.total), 0);

    return {
      totalUsuarios,
      totalPedidos,
      totalVentas,
    };
  }

  async productosMasVendidos() {
    return this.ppRepo
      .createQueryBuilder('pp')
      .leftJoinAndSelect('pp.producto', 'producto')
      .select('producto.nombre', 'producto')
      .addSelect('SUM(pp.cantidad)', 'cantidad')
      .groupBy('producto.nombre')
      .orderBy('cantidad', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async ventasPorDia() {
    return this.pedidoRepo
      .createQueryBuilder('p')
      .select("CONVERT(date, p.fecha)", "fecha")
      .addSelect("SUM(p.total)", "ventas")
      .groupBy("CONVERT(date, p.fecha)")
      .orderBy("fecha", "ASC")
      .getRawMany();
  }
}
