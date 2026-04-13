import { IsIn } from 'class-validator';

export class MarkMessageStatusDto {
  @IsIn(['delivered', 'read'])
  status: 'delivered' | 'read';
}
