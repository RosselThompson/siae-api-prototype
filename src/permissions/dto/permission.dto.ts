import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PermissionDto {
  @ApiProperty()
  @IsBoolean()
  show: boolean;

  @ApiProperty()
  @IsBoolean()
  save: boolean;

  @ApiProperty()
  @IsBoolean()
  edit: boolean;

  @ApiProperty()
  @IsBoolean()
  remove: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  menuItemId: string;

  @ApiPropertyOptional()
  @IsString()
  id?: string;
}
