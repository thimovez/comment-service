import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login.user.dto';
import { SingInResponse } from './interfaces/singInResponse.interface';
import { RegistrationUserDTO } from './dto/registration.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(u: LoginUserDTO): Promise<SingInResponse> {
    const user = await this.user.findOne(u.email);
    if (user?.password !== u.password) {
      throw new UnauthorizedException("password is'nt match");
    }

    const createID = uuidv4();
    const tokenPayload = {id: createID, email: u.email };

    const singInResponse = {
      user: {
        id: createID,
        email: u.email
      },
      tokens: {
        access_token: await this.jwtService.signAsync(tokenPayload),
        refresh_token: await this.jwtService.signAsync(tokenPayload, {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION
        })
      }
    };

    return singInResponse
  }

  async signUp(consumer: RegistrationUserDTO): Promise<void> {
    try {
      consumer.id = uuidv4();
      await this.user.create(consumer)
    } catch (error) {
      console.error('Error signing up user:', error);
      throw new HttpException('Failed to sign up user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}