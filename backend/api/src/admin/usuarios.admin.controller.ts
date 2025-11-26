import { Controller, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/usuarios')
export class UsuariosAdminController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Put(':id/rol')
  cambiarRol(
    @Param('id') id: number,
    @Body() body: { rol: string }
  ) {
    return this.usuarioService.update(id, { rol: body.rol });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuarioService.delete(id);
  }
}