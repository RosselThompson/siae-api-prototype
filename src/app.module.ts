import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DbConfigModule } from './config/db/config.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { ModuloModule } from './modulo/modulo.module';
import { PermisoModule } from './permiso/permiso.module';
import { RecintoModule } from './recinto/recinto.module';
import { FacultadModule } from './facultad/facultad.module';
import { CarreraModule } from './carrera/carrera.module';

@Module({
  imports: [
    AppConfigModule,
    DbConfigModule,
    AuthModule,
    UsuarioModule,
    RolModule,
    ModuloModule,
    PermisoModule,
    RecintoModule,
    FacultadModule,
    CarreraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
