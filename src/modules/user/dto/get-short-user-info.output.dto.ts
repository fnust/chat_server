import { ApiProperty } from '@nestjs/swagger';

export class GetShortUserInfoOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}
