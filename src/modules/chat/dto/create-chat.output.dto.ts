import { ApiProperty } from '@nestjs/swagger';

export class CreateChatOutputDto {
  @ApiProperty()
  id: string;
}
