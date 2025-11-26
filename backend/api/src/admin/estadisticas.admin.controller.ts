import { Controller, Get, UseGuards } from '@nestjs/common';
import { PedidoService } from '../pedido/pedido.service';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/estadisticas')
export class EstadisticasAdminController {
  constructor(
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
  ) {}

  @Get()
  async getStats() {
    const usuarios = await this.usuarioService.count();
    const productos = await this.productoService.count();
    const pedidos = await this.pedidoService.count();
    const ventas = await this.pedidoService.totalVentas();

    return {
      usuarios,
      productos,
      pedidos,
      ventas,
    };
  }
}