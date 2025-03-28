import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const startTimestamp = new Date().getTime();

    res.once("finish", () => {
      const { method, originalUrl } = req;
      const duration = new Date().getTime() - startTimestamp;
      const message = `[${method}] ${originalUrl} ${duration}ms`;

      this.logger.log(message);
    });

    next();
  }
}
