import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PermisoDto } from 'src/permiso/dto/permiso.dto';

export class RolDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiPropertyOptional({ type: [PermisoDto] })
  permisos: PermisoDto[];
}
