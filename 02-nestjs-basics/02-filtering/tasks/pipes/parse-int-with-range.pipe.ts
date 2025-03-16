import { HttpStatus, ParseIntPipe, ParseIntPipeOptions } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

interface ParseIntWithRangePipeOptions extends ParseIntPipeOptions {
  min?: number;
  max?: number;
  fieldName?: string;
}

export class ParseIntWithRangePipe extends ParseIntPipe {
  private readonly fieldName?: string;
  private readonly min?: number;
  private readonly max?: number;

  constructor(options?: ParseIntWithRangePipeOptions) {
    super(options);
    this.min = options.min;
    this.max = options.max;
    this.fieldName = options.fieldName;
  }

  protected exceptionFactory = () => {
    const field =
      this.fieldName !== undefined ? ` Field: '${this.fieldName}'` : "";
    const min = this.min !== undefined ? ` >= ${this.min}` : "";
    const max = this.max !== undefined ? ` <= ${this.max}` : "";
    const and = this.max !== undefined && this.max !== undefined ? " and" : "";

    const message = `Validation failed (numeric string is expected).${field}${max}${and}${min}`;

    return new HttpErrorByCode[HttpStatus.BAD_REQUEST](message);
  };

  protected isNumeric(value: string): boolean {
    const isNumber = super.isNumeric(value);
    const isMin = this.min === undefined || Number(value) >= this.min;
    const isMax = this.max === undefined || Number(value) <= this.max;

    return isNumber && isMin && isMax;
  }
}
