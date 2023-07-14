import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

export class MenuItemQueryDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  name?: string;
}
