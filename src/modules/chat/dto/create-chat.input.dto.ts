import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateChatInputDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID('all', { each: true })
  users: string[];
}
