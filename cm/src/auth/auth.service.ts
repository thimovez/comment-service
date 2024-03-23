import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    //TODO create id user
    // const payload = { id: u.userID, email: u.email };
    const payload = {email: u.email };

    return {
      user: {
        id: 0,
        email: u.email
      },
      tokens: {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(payload, {expiresIn: "7d"})
      }
    };
  }
}