import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Response } from "express";

import * as fs from "fs";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const timestamp = new Date().toISOString();
    const { message, stack } = exception;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    fs.appendFileSync(
      "errors.log",
      `[${timestamp}] ${status} - ${message}\nStack: ${stack}\n`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp,
      message,
    });
  }
}
