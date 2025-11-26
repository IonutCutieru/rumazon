import { Module } from '@nestjs/common';
import { ProductosAdminController } from './productos.admin.controller';
import { UsuariosAdminController } from './usuarios.admin.controller';
import { PedidosAdminController } from './pedidos.admin.controller';
import { EstadisticasAdminController } from './estadisticas.admin.controller';

@Module({
  controllers: [
    ProductosAdminController,
    UsuariosAdminController,
    PedidosAdminController,
    EstadisticasAdminController
  ],
})
export class AdminModule {}
