import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./passport/jwt.stategy";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./passport/google.strategy";
import { ConfigModule, ConfigType } from "@nestjs/config";
import authConfig from "../configs/auth.config";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [authConfig.KEY],
      useFactory: async (config: ConfigType<typeof authConfig>) => {
        return {
          secret: config.JWT_SECRET_KEY,
          signOptions: { expiresIn: config.JWT_EXPIRES_IN },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
