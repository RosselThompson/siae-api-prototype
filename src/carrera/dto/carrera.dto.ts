import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { FacultadDto } from 'src/facultad/dto/facultad.dto';

export class CarreraDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiPropertyOptional({ type: [FacultadDto] })
  facultades: FacultadDto[];
}
