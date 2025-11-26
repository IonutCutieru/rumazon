import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) return false;

    const token = auth.split(' ')[1];
    const decoded = this.jwt.decode(token);

    return decoded?.rol === 'admin';
  }
}
