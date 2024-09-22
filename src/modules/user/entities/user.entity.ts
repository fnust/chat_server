import { Chat } from 'src/modules/chat/entities/chat.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({ name: 'user2chat' })
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
