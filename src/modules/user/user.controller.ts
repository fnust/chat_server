import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserOutputDto } from './dto/create-user.output.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  @ApiResponse({ status: 201, type: CreateUserOutputDto })
  async create(
    @Body() createUserInputDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const user = await this.userService.create(createUserInputDto);
    return { id: user.id };
  }
}
