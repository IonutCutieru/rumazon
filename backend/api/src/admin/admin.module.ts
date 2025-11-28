import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Controladores admin
import { ProductosAdminController } from './productos.admin.controller';
import { UsuariosAdminController } from './usuarios.admin.controller';
import { PedidosAdminController } from './pedidos.admin.controller';
import { EstadisticasAdminController } from './estadisticas.admin.controller';

// Módulos que contienen los repos (NECESARIO)
import { ProductoModule } from '../producto/producto.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { PedidoModule } from '../pedido/pedido.module';
import { PedidoProductoModule } from '../pedido_producto/pedido_producto.module';

// Guard + Servicios
import { AdminGuard } from '../auth/guards/admin.guard';
import { EstadisticasAdminService } from './estadisticas.admin.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '2h' },
    }),

    // NECESARIO para que Nest cargue repositorios de:
    // Pedido, PedidoProducto y Usuario
    ProductoModule,
    UsuarioModule,
    PedidoModule,
    PedidoProductoModule,
  ],

  controllers: [
    ProductosAdminController,
    UsuariosAdminController,
    PedidosAdminController,
    EstadisticasAdminController,
  ],

  providers: [
    AdminGuard,
    EstadisticasAdminService,
  ],
})
export class AdminModule {}
