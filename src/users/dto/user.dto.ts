import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @Length(1, 50)
  name: string;
  @IsEmail()
  email: string;
  @Length(8, 75)
  password: string;
}
