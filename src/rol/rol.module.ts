import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from 'src/permiso/entities/permiso.entity';
import { PermisoModule } from 'src/permiso/permiso.module';
import { Rol } from './entities/rol.entity';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Permiso]), PermisoModule],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService],
})
export class RolModule {}
