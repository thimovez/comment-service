import { Module } from '@nestjs/common';
import { UserService } from './users.service';
// import { userProviders } from './user.providers';
import { PostgresConnectionModule } from 'src/database/postgres-connection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [PostgresConnectionModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
