import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/user.dto';
import { SingInResponse } from './interfaces/singInResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(u: CreateUserDTO): Promise<SingInResponse> {
    const user = await this.usersService.findOne(u.email);
    if (user?.password !== u.password) {
      throw new UnauthorizedException();
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
        refresh_token: await this.jwtService.signAsync(tokenPayload, {expiresIn: "7d"})
      }
    };

    return singInResponse
  }
}