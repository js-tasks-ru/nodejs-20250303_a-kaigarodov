import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status = 400, message } = exception;

    response.status(status).json({
      error: "Bad Request",
      message,
      statusCode: status,
    });
  }
}
