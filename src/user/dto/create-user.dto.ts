import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}
