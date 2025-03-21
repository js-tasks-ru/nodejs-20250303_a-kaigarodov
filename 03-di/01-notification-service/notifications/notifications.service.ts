import {
  Injectable,
  Logger,
  BadRequestException,
  Optional,
  Inject,
} from "@nestjs/common";
import { NOTIFICATION_TOKENS } from "./notifications.model";
import { FileLoggerService } from "../file-logger/file-logger.service";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly fileLogger: FileLoggerService,
    @Optional()
    @Inject(NOTIFICATION_TOKENS.SENDER_EMAIL)
    senderEmail?: string,
    @Optional()
    @Inject(NOTIFICATION_TOKENS.SMS_GATEWAY)
    smsGateway?: string,
  ) {
    this.logger.log(`senderEmail: ${senderEmail}; smsGateway: ${smsGateway}`);
  }

  sendEmail(to: string, subject: string, message: string): void {
    const recipient = this.validateRecipient(to, "email");

    const logMessage = `Email sent to ${recipient}: [${subject}] ${message}`;
    this.logger.log(logMessage);
    this.fileLogger.log(logMessage);
  }

  sendSMS(to: string, message: string): void {
    const recipient = this.validateRecipient(to, "phone");

    const logMessage = `SMS sent to ${recipient}: ${message}`;
    this.logger.log(logMessage);
    this.fileLogger.log(logMessage);
  }

  private validateRecipient(recipient: string, variant: string): string {
    if (typeof recipient !== "string") {
      throw new BadRequestException(`(${variant}) recipient must be a string`);
    }

    if (!recipient) {
      throw new BadRequestException(
        `(${variant}) the recipient of the message cannot be empty`,
      );
    }

    return recipient;
  }
}
