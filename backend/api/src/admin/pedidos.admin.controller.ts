import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PedidoService } from '../pedido/pedido.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/pedidos')
export class PedidosAdminController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidoService.findOne(id);
  }
}
