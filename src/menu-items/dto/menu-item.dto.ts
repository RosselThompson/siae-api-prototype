import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiPropertyOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional()
  @IsNumber()
  order?: number;
}
