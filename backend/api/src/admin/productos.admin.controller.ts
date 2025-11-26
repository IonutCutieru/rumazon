import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductoService } from '../producto/producto.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/productos')
export class ProductosAdminController {
  constructor(private productoService: ProductoService) {}

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.productoService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.productoService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productoService.delete(id);
  }
}