import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private repo: Repository<Producto>,
  ) {}

  // Obtener todos los productos (opcional búsqueda q)
  async findAll(q?: string) {
    if (q && q.trim() !== '') {
      const term = `%${q.trim()}%`;
      return this.repo.find({
        where: [
          { nombre: Like(term) },
          { descripcion: Like(term) }
        ],
        order: { id_producto: 'ASC' }
      });
    }

    return this.repo.find({ order: { id_producto: 'ASC' } });
  }

  // Crear un producto
  create(data: Partial<Producto>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }

  // Buscar un producto por ID
  async findOne(id: number) {
    const producto = await this.repo.findOne({
      where: { id_producto: id },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async update(id: number, data: Partial<Producto>) {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.repo.save(producto);
  }

  async delete(id: number) {
    const producto = await this.findOne(id);
    return this.repo.remove(producto);
  }
}
