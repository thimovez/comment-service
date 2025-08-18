import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDTO } from '../auth/dto/login.user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  private readonly users = [
    {
      id: '1',
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      id: '2',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<LoginUserDTO | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(userData: Partial<User>): Promise<User> {
    const userEntity = this.userRepo.create(userData);
    return await this.userRepo.save(userEntity);
  }
}
