import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/login.user.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userID: 1,
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      userID: 2,
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<CreateUserDTO | undefined> {
    const user = this.users.find(user => user.email === email);
    return user
  }
}