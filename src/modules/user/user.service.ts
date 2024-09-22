import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-user.input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async exist(params: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOneBy(params);
  }

  async create(createUserInputDto: CreateUserInputDto): Promise<User> {
    if (await this.exist({ username: createUserInputDto.username })) {
      throw new ConflictException('Пользователь с таким именем уже существует');
    }

    const user = this.userRepository.create(createUserInputDto);
    return this.userRepository.save(user);
  }
}
