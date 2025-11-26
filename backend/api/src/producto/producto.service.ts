import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private repo: Repository<Producto>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Producto>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }
}