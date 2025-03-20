import { Inject, Logger, Optional } from "@nestjs/common";
import { stat, writeFile, appendFile } from "fs/promises";
import { FILE_LOGGER_TOKENS } from "./file-logger.model";

export class FileLoggerService {
  @Optional()
  @Inject(FILE_LOGGER_TOKENS.PATH)
  private readonly logFilePath = "log";

  private isFileExist: boolean = false;

  private readonly logger = new Logger(FileLoggerService.name);

  constructor() {
    this.checkFileExist();
  }

  async log(
    message: string,
    timestamp = new Date().toISOString(),
  ): Promise<void> {
    const formateMessage = `${timestamp}: ${message}\n`;

    try {
      if (this.isFileExist) {
        await appendFile(this.logFilePath, formateMessage);
      } else {
        this.isFileExist = true;
        await writeFile(this.logFilePath, formateMessage);
      }
    } catch {
      this.logger.warn("Error when logging a message to a file");
    }
  }

  private async checkFileExist(): Promise<void> {
    try {
      const { isFile } = await stat(this.logFilePath);
      this.isFileExist = isFile();
    } catch {
      this.isFileExist = false;
    }
  }
}
