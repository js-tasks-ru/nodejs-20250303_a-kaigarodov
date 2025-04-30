import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Inject, Injectable } from "@nestjs/common";
import authConfig from "../../configs/auth.config";
import { ConfigType } from "@nestjs/config";
import { UsersService } from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
    private usersService: UsersService,
  ) {
    super({
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, displayName, photos } = profile;

    const user = await this.usersService.findOne(id);

    if (user) return user;

    return this.usersService.create({
      id,
      displayName,
      avatar: photos[0]?.value,
      password: "",
    });
  }
}
