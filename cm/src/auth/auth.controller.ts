import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { SingInResponse } from './interfaces/singInResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDTO, @Res() res: Response): Promise<SingInResponse> {
    const singInResponse = this.authService.signIn(signInDto);

    res.cookie("refreshToken", 
    singInResponse.then(v => v.tokens.refresh_token), {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true
    });

    return singInResponse;
  }
}