import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModuloDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiPropertyOptional()
  @IsString()
  icono?: string;

  @ApiPropertyOptional()
  @IsNumber()
  orden?: number;
}
