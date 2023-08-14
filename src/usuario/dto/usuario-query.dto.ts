import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class UsuarioQueryDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  _isActive?: boolean;
}
