import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    const startTimestamp = new Date().getTime();

    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: new Date().getTime() - startTimestamp,
      })),
    );
  }
}
