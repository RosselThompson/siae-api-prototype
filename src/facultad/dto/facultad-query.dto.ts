import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class FacultadQueryDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  codigo?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  _isActive?: boolean;
}
