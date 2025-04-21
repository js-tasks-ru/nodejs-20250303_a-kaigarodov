import { Expose } from "class-transformer";
import { IsOptional } from "class-validator";
import { IsNotEmptyString } from "../../utils/is-not-empty-string";

export class TasksFindAllQueryDto {
  @IsNotEmptyString()
  @IsOptional()
  @Expose({ name: "holder-login" })
  holderLogin: string;
}
