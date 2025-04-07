import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class TasksFindAllQueryDto {
  @IsString()
  @IsOptional()
  @Expose({ name: "holder-login" })
  holderLogin: string;
}
