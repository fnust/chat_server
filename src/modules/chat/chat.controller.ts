import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatInputDto } from './dto/create-chat.input.dto';
import { GetChatsInputDto } from './dto/get-chats.input.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatOutputDto } from './dto/create-chat.output.dto';
import { GetChatsOutputDto } from './dto/get-chats.output.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('get')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [GetChatsOutputDto] })
  async get(
    @Body() getChatsInputDto: GetChatsInputDto,
  ): Promise<GetChatsOutputDto[]> {
    const { user } = getChatsInputDto;
    return await this.chatService.get(user);
  }

  @Post('add')
  @ApiResponse({ status: 201, type: CreateChatOutputDto })
  async create(
    @Body() createChatInputDto: CreateChatInputDto,
  ): Promise<CreateChatOutputDto> {
    const { name, users } = createChatInputDto;
    const chat = await this.chatService.create(name, users);
    return { id: chat.id };
  }
}
