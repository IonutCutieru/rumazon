import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';

// ➤ IMPORTA ESTO
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  
  providers: [
    AuthService,
    JwtStrategy,
    AdminGuard
  ],

  exports: [AuthService],
})
export class AuthModule {}
