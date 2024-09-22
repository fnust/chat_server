import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateMessageInputDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsUUID()
  author: string;

  @ApiProperty()
  @IsUUID()
  chat: string;
}
