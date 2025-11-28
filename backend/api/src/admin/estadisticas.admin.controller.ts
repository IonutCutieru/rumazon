import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { EstadisticasAdminService } from './estadisticas.admin.service';

@UseGuards(AdminGuard)
@Controller('admin/estadisticas')
export class EstadisticasAdminController {
  constructor(private estatService: EstadisticasAdminService) {}

  @Get()
  async getAllStats() {
    return this.estatService.getAllStats();
  }

  @Get('productos-mas-vendidos')
  async productosMasVendidos() {
    return this.estatService.productosMasVendidos();
  }

  @Get('ventas-por-dia')
  async ventasPorDia() {
    return this.estatService.ventasPorDia();
  }
}
