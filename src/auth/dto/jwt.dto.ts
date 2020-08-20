import { IsUUID, IsEmail, Length } from "class-validator";

export class JwtPayload {
  @IsUUID()
  sub: string;
  @IsEmail()
  email: string;
  @Length(1, 50)
  username: string;
}
