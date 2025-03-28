import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, _: Response, next: NextFunction) {
    const { method, originalUrl, hostname, protocol } = req;
    const message = `Request ${protocol}://${hostname}${originalUrl} ${method}`;

    this.logger.log(message);

    next();
  }
}
