import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login.user.dto';
import { RegistrationUserDTO } from './dto/registration.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    u: LoginUserDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findOne(u.email);
    if (user?.password !== u.password) {
      throw new UnauthorizedException("password isn't match");
    }

    const userID = uuidv4();
    const tokenPayload = { id: userID };

    return {
      accessToken: await this.jwtService.signAsync(tokenPayload),
      refreshToken: await this.jwtService.signAsync(tokenPayload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      }),
    };
  }

  async signUp(user: RegistrationUserDTO): Promise<void> {
    await this.userService.create({
      email: user.email,
      password: user.password,
    });
  }
}
