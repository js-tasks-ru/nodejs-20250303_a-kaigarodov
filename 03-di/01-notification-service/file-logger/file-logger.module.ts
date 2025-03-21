import { DynamicModule, Module } from "@nestjs/common";
import { FileLoggerService } from "../file-logger/file-logger.service";
import { FILE_LOGGER_TOKENS, FileLoggerOptions } from "./file-logger.model";

@Module({
  providers: [FileLoggerService],
  exports: [FileLoggerService],
})
export class FileLoggerModule {
  static forFeature(options: FileLoggerOptions): DynamicModule {
    const providers = Object.entries(options).map(([token, value]) => ({
      provide: FILE_LOGGER_TOKENS[token],
      useValue: value,
    }));

    return {
      module: FileLoggerModule,
      providers,
    };
  }
}
