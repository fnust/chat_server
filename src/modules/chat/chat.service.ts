import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async exist(params: FindOptionsWhere<Chat>): Promise<Chat> {
    return this.chatRepository.findOneBy(params);
  }

  async get(userId: string): Promise<Chat[]> {
    const user = await this.userService.exist({ id: userId });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const chats = this.chatRepository.find({
      where: { users: { id: userId } },
      order: { createdAt: 'DESC' },
    });

    return chats;
  }

  async create(name: string, userIds: string[]): Promise<Chat> {
    if (await this.exist({ name })) {
      throw new ConflictException('Чат с таким именем уже существует');
    }

    const userExistsPromises = userIds.map((userId) =>
      this.userService.exist({ id: userId }),
    );
    const users = await Promise.all(userExistsPromises);

    if (users.includes(null)) {
      throw new NotFoundException('Какого-то пользователя не существует');
    }

    const chat = this.chatRepository.create({ name, users });
    return this.chatRepository.save(chat);
  }
}
