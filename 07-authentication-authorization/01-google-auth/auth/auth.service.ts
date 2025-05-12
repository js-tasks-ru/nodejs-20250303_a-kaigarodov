import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(dto: LoginDto) {
    const user = await this.usersService.findOne(dto.login);

    if (user) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }

    const { login, password } = dto;
    const hashPassport = await this.createHashPassword(password);

    const newUser = await this.usersService.create({
      id: login,
      password: hashPassport,
    });

    return this.login(newUser);
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      displayName: user.displayName,
      avatar: user.avatar,
    };

    return { token: this.jwtService.sign(payload) };
  }

  private createHashPassword(password: string) {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }
}
