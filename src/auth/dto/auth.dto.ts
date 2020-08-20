import { IsEmail, Length, IsJWT } from "class-validator";

export class AuthUserDto {
  @IsEmail()
  email: string;
  @Length(8, 75)
  password: string;
}

export class AuthTokenDto {
  @IsJWT()
  accessToken: string;
}
