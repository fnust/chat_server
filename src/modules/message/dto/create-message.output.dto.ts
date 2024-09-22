import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOutputDto {
  @ApiProperty()
  id: string;
}
