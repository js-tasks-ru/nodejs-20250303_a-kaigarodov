export const NOTIFICATION_TOKENS = {
  SMS_GATEWAY: Symbol("SMS_GATEWAY"),
  SENDER_EMAIL: Symbol("SENDER_EMAIL"),
} as const;

export type NotifyOptions = Partial<
  Record<keyof typeof NOTIFICATION_TOKENS, string>
>;
