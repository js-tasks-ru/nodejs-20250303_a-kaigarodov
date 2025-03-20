export const FILE_LOGGER_TOKENS = {
  PATH: Symbol("PATH"),
} as const;

export type FileLoggerOptions = Partial<
  Record<keyof typeof FILE_LOGGER_TOKENS, string>
>;
