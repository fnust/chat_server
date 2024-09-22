import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { ChatService } from '../chat/chat.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ChatService)
    private readonly chatService: ChatService,
  ) {}

  async get(chatId: string): Promise<Message[]> {
    const chat = await this.chatService.exist({ id: chatId });
    if (!chat) {
      throw new NotFoundException('Чат не найден');
    }

    const chats = this.messageRepository.find({
      where: { chat: { id: chatId } },
      order: { createdAt: 'ASC' },
      relations: { author: true },
      select: { author: { id: true, username: true } },
    });

    return chats;
  }

  async create(
    chatId: string,
    authorId: string,
    text: string,
  ): Promise<Message> {
    const chat = await this.chatService.exist({ id: chatId });
    if (!chat) {
      throw new NotFoundException('Чат не найден');
    }

    const author = await this.userService.exist({
      id: authorId,
      chats: { id: chatId },
    });
    if (!author) {
      throw new NotFoundException('Пользователя нет в этом чате');
    }

    const message = this.messageRepository.create({ author, chat, text });
    return this.messageRepository.save(message);
  }
}
