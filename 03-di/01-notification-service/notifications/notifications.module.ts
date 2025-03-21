import { DynamicModule, Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NOTIFICATION_TOKENS, NotifyOptions } from "./notifications.model";
import { FileLoggerModule } from "../file-logger/file-logger.module";

@Module({
  imports: [FileLoggerModule.forFeature({ PATH: "./notification-log.txt" })],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {
  static forFeature(options: NotifyOptions): DynamicModule {
    const providers = Object.entries(options).map(([token, value]) => ({
      provide: NOTIFICATION_TOKENS[token],
      useValue: value,
    }));

    return {
      module: NotificationsModule,
      providers,
    };
  }
}
