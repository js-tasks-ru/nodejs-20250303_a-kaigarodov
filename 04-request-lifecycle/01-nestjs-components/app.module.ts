import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "./filters/http-error.filter";

@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
