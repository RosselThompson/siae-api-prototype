import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class PermisoDto {
  @ApiProperty()
  @IsBoolean()
  mostrar: boolean;

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;

  @ApiProperty()
  @IsBoolean()
  editar: boolean;

  @ApiProperty()
  @IsBoolean()
  eliminar: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rolId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  moduloId: number;

  @ApiPropertyOptional()
  @IsNumber()
  id?: number;
}
