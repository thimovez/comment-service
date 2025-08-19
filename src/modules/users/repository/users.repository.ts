import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../../database/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private dataSource: DataSource) {}

  private get repo() {
    return this.dataSource.getRepository(User);
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  createUser(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
