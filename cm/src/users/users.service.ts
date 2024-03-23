import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userID: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userID: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user
  }
}