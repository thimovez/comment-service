import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { User } from '../../users/interfaces/user.interface';

export class RegistrationUserDTO implements User {
    id: string;
    @IsEmail({}, {message: "Invalid email"})
    readonly email: string;
    @IsNotEmpty({message: 'Password should not be empty'})
    @Length(4, 16, {message: 'Password should be not less than 4 character and not more than 16 character'})
    readonly password: string;
}
