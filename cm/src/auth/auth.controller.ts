import { Body, Controller, Post, HttpCode, HttpStatus, Res, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { SingInResponse } from './interfaces/singInResponse.interface';
import { RegistrationUserDTO } from './dto/registration.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDTO, @Res({ passthrough: true }) res: Response): Promise<SingInResponse> {
    const singInResponse = await this.authService.signIn(signInDto);
    res.cookie("refreshToken", 
    singInResponse.tokens.refresh_token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true
    });

    return singInResponse;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async signUp(@Body() signUpDTO: RegistrationUserDTO, @Res({passthrough: true}) res: Response): Promise<void>{
      try {
        await this.authService.signUp(signUpDTO);
      } catch (error) {
        throw error
      }
  }
}