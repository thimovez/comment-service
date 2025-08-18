import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostgresConnectionModule } from './database/postgres-connection.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule, AuthModule, UsersModule, PostgresConnectionModule],
})
export class AppModule {}
