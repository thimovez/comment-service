import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { RegistrationUserDTO } from './dto/registration.user.dto';
import { SingInResponse } from './dto/singInResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SingInResponse> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return { accessToken };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async signUp(@Body() signUpDTO: RegistrationUserDTO): Promise<void> {
    await this.authService.signUp(signUpDTO);
  }
}
