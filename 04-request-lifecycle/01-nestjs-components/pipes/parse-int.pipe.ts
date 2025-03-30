import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    if (Number.isNaN(Number(value))) {
      throw new BadRequestException(`"${value}" не является числом`);
    }

    return Number.parseInt(value);
  }
}
