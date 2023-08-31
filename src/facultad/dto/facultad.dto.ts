import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FacultyType } from 'src/common/constants/facultyType';

export class FacultadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ enum: FacultyType, default: FacultyType.FACULTAD })
  @IsEnum(FacultyType)
  @IsNotEmpty()
  tipo: FacultyType;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id?: number;
}
