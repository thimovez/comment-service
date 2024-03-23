import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class CreateUserDTO implements User {
    @IsEmail({}, {message: "Invalid email"})
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}
