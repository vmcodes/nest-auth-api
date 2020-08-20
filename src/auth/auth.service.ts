import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthUserDto, AuthTokenDto } from "./dto/auth.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(authUserDto: AuthUserDto): Promise<AuthTokenDto> {
    const user = await this.usersService.findOne(authUserDto.email);

    if (user && bcrypt.compareSync(authUserDto.password, user.password)) {
      const payload = { username: user.name, email: user.email, sub: user._id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
