import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(u: User): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(u.email);
    if (user?.password !== u.password) {
      throw new UnauthorizedException();
    }
    const payload = { id: u.userID, email: u.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}