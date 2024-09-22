import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetChatsInputDto {
  @ApiProperty()
  @IsUUID()
  user: string;
}
