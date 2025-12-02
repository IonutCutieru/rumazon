import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productoService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.productoService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.productoService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productoService.delete(id);
  }
}
