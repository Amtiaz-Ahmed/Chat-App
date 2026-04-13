import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendDirectMessageDto {
  @Type(() => Number)
  @IsInt()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  type?: string;
}
