import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class CreateUserDTO implements User {
    @IsEmail({}, {message: "Invalid email"})
    readonly email: string;
    @IsNotEmpty()
    @Length(4, 16, {message: 'Not less than 4 character and not more than 16 character'})
    readonly password: string;
}
