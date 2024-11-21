import { config } from "dotenv";
import path from "path";
config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || "dev"}`),
});

const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  HASH_SECRET,
  SMS_SID,
  SMS_AUTH_TOKEN,
  SMS_FROM_NUMBER,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

export const Config = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  HASH_SECRET,
  SMS_SID,
  SMS_AUTH_TOKEN,
  SMS_FROM_NUMBER,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
};
