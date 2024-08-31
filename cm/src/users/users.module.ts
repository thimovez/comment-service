import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    UserService,
    ...userProviders
  ],
  exports: [UserService],
})
export class UsersModule {}
