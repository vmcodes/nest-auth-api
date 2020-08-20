import { configs } from "../environment";
import { JwtPayload } from "./dto/jwt.dto";
import { UsersService } from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.secret,
    });
  }

  async validate(jwtPayload: JwtPayload) {
    const user = await this.usersService.findById(jwtPayload.sub);

    if (user) {
      const payload = { username: user.name, email: user.email, sub: user._id };
      return {
        payload,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
