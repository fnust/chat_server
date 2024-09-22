import { ApiProperty } from '@nestjs/swagger';
import { GetShortUserInfoOutputDto } from 'src/modules/user/dto/get-short-user-info.output.dto';

export class GetMessagesOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  author: GetShortUserInfoOutputDto;

  @ApiProperty()
  createdAt: Date;
}
