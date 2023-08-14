import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoService } from './permiso.service';
import { Permiso } from './entities/permiso.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, Rol, Modulo])],
  providers: [PermisoService],
  exports: [PermisoService],
})
export class PermisoModule {}
