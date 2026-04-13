import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendGroupMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  type?: string;
}
