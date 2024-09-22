import { ApiProperty } from '@nestjs/swagger';

export class GetChatsOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
