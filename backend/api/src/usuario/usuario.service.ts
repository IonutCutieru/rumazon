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

  // Buscar por email
  async findByEmail(email: string) {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }

  // Crear usuario
  async create(data: Partial<Usuario>) {
    const usuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(usuario);
  }

  // Listar todos los usuarios
  async findAll() {
    return this.usuarioRepository.find();
  }

  // Buscar usuario por ID
  async findOne(id: number) {
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  // Cambiar rol del usuario (admin panel)
  async updateRol(id: number, rol: string) {
    const user = await this.findOne(id);
    user.rol = rol;
    return this.usuarioRepository.save(user);
  }

  // Eliminar usuario
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usuarioRepository.remove(user);
  }
  // Método usado por admin para actualizar campos
  async update(id: number, data: Partial<Usuario>) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usuarioRepository.save(user);
  }

  // Método que tu controlador usa en DELETE
  async delete(id: number) {
    const user = await this.findOne(id);
    return this.usuarioRepository.remove(user);
  }
}
