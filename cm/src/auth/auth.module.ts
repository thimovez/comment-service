import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION')}
        }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.REQUEST_TTL),
      limit: parseInt(process.env.REQUEST_LIMIT),
    }]),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})

export class AuthModule {}
