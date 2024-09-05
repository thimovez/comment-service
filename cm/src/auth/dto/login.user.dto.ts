import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../../users/interfaces/user.interface';

export class LoginUserDTO implements User {
    id: string;
    @IsNotEmpty()
    @IsEmail({}, {message: "Invalid email"})
    readonly email: string;
    @IsNotEmpty({message: 'Password should not be empty'})
    readonly password: string;
}
