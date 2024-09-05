import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUserDTO } from '../auth/dto/login.user.dto';
import { RegistrationUserDTO } from 'src/auth/dto/registration.user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { USER_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: Repository<User>
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
    const user = this.users.find(user => user.email === email);
    return user
  }

  async create(consumer: RegistrationUserDTO): Promise<User> {
    try {
      const userEntity = this.userRepo.create(consumer)
      return await this.userRepo.save(userEntity);
    } catch (error) {
      console.error('Failed to create user:', error);
    throw new HttpException('Internal server error while creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}