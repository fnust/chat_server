import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageInputDto } from './dto/create-message.input.dto';
import { GetMessagesInputDto } from './dto/get-messages.input.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageOutputDto } from './dto/create-message.output.dto';
import { GetMessagesOutputDto } from './dto/get-messages.output.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('get')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [GetMessagesOutputDto] })
  async get(
    @Body() getMessagesInputDto: GetMessagesInputDto,
  ): Promise<GetMessagesOutputDto[]> {
    const { chat } = getMessagesInputDto;
    return await this.messageService.get(chat);
  }

  @Post('add')
  @ApiResponse({ status: 201, type: CreateMessageOutputDto })
  async create(
    @Body() createMessageInputDto: CreateMessageInputDto,
  ): Promise<CreateMessageOutputDto> {
    const { chat, author, text } = createMessageInputDto;
    const message = await this.messageService.create(chat, author, text);
    return { id: message.id };
  }
}
