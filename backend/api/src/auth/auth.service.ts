import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const userExist = await this.usuarioService.findByEmail(dto.email);
    if (userExist) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usuarioService.create({
      ...dto,
      password: hashedPassword,
    });

    return { message: 'Usuario registrado correctamente', user };
  }

  async login(dto: LoginDto) {
    const user = await this.usuarioService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { id: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login correcto',
      token,
      user,
    };
  }
}
