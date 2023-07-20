import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, MenuItem])],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
