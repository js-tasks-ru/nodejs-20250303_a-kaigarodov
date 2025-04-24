import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotEmptyString } from "../../utils/is-not-empty-string";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmptyString()
  holderLogin: string;
}
