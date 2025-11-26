import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user?.rol !== 'admin') {
      throw new ForbiddenException('Solo los administradores pueden acceder');
    }

    return true;
  }
}
