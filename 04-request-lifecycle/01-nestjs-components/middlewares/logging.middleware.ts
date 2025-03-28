import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTimestamp = new Date().getTime();

    res.once("finish", () => {
      const { method, originalUrl } = req;
      const duration = new Date().getTime() - startTimestamp;
      const message = `[${method}] ${originalUrl} ${duration}ms`;

      console.log(message);
    });

    next();
  }
}
