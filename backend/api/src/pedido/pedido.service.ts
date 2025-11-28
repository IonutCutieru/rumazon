import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  // Listar todos los pedidos con sus relaciones
  async findAll() {
    return this.pedidoRepository.find({
      relations: [
        'usuario',                // Usuario propietario del pedido
        'pedidoProductos',        // Relación intermedia
        'pedidoProductos.producto' // Productos comprados
      ],
      order: { fecha: 'DESC' }
    });
  }

  // Obtener un pedido concreto por su ID
  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id_pedido: id },
      relations: [
        'usuario',
        'pedidoProductos',
        'pedidoProductos.producto'
      ]
    });

    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    return pedido;
  }

  // (Opcional) Contar total pedidos (para estadísticas)
  async count() {
    return this.pedidoRepository.count();
  }

  // (Opcional) Calcular total de ventas
  async totalVentas() {
    const pedidos = await this.pedidoRepository.find();
    return pedidos.reduce((sum, p) => sum + Number(p.total), 0);
  }
}
