import { IsNotEmptyString } from "../../utils/is-not-empty-string";
import { IUser } from "../models/user.model";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto implements IUser {
  @IsNotEmptyString()
  login: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;
}
