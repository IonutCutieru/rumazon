import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private repo: Repository<Producto>,
  ) {}

  // Obtener todos los productos
  findAll() {
    return this.repo.find();
  }

  // Obtener un producto por su ID
  async findOne(id: number) {
    const producto = await this.repo.findOne({
      where: { id_producto: id },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  // Crear un producto
  create(data: Partial<Producto>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }

  // Actualizar un producto
  async update(id: number, data: Partial<Producto>) {
    const producto = await this.findOne(id);

    const updated = Object.assign(producto, data);
    return this.repo.save(updated);
  }

  // Eliminar un producto
  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.repo.remove(producto);
  }
}
