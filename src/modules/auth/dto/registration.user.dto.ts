import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegistrationUserDTO {
  @IsEmail({}, { message: 'Invalid format email' })
  readonly email: string;
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Length(4, 16, {
    message:
      'Password should be not less than 4 character and not more than 16 character',
  })
  readonly password: string;
}
