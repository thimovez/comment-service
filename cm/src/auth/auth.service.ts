import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';
import { SingInResponse } from './interfaces/singInResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(u: User): Promise<SingInResponse> {
    const user = await this.usersService.findOne(u.email);
    if (user?.password !== u.password) {
      throw new UnauthorizedException();
    }
    
    const payload = { id: u.userID, email: u.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {expiresIn: "7d"})
    };
  }
}