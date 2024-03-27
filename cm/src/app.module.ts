import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          port: configService.get<number>('POSTGRES_PORT'),
          host: configService.get<string>('POSTGRES_HOST'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          username: configService.get<string>('POSTGRES_USERNAME'),
          entities: [User],
          database: configService.get<string>('POSTGRES_DB'),
          synchronize: true,
        }),
    inject: [ConfigService],
    }),
    AuthModule,
    UsersModule
  ],
})

export class AppModule {}
