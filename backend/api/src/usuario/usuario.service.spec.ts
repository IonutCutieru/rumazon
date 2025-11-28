import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.usuarioRepository.find();
  }

  async findByEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: Partial<Usuario>) {
    const usuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(usuario);
  }

  // 🟦 Actualizar rol de usuario (para admin)
  async updateRol(id: number, rol: string) {
    const user = await this.findById(id);
    user.rol = rol;
    return this.usuarioRepository.save(user);
  }

  async update(id: number, data: Partial<Usuario>) {
    const user = await this.findById(id);
    Object.assign(user, data);
    return this.usuarioRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);
    return this.usuarioRepository.remove(user);
  }
}

