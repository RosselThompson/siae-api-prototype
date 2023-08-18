import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FacultadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiPropertyOptional()
  @IsString()
  siglas?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recintoId: number;
}
