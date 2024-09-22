import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetMessagesInputDto {
  @ApiProperty()
  @IsUUID()
  chat: string;
}
