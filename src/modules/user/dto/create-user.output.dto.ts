import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOutputDto {
  @ApiProperty()
  id: string;
}
