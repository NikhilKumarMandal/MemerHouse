import { createLogger, format, transports } from "winston";
import { Config } from "../config";
const { combine, timestamp, json, colorize } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: "app.log",
      dirname: "logs",
      level: "info",
      silent: Config.NODE_ENV === "test",
    }),
    new transports.File({
      filename: "error.log",
      dirname: "logs",
      level: "error",
      silent: Config.NODE_ENV === "test",
    }),
  ],
});

export default logger;
