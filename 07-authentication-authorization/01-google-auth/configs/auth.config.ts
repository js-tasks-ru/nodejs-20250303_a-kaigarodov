import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => {
  return {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
    GOOGLE_CLIENT_SECRET:
      process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "killer-is-jim",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  };
});
