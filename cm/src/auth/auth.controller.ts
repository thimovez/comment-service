import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/interfaces/user.interface';
import { SingInResponse } from './interfaces/singInResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: User): Promise<SingInResponse> {
    return this.authService.signIn(signInDto);
  }
}