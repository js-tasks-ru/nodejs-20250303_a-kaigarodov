import { IUser } from "../models/user.model";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;
}
