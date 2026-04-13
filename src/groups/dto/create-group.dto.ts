import { Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  memberIds?: number[];
}
