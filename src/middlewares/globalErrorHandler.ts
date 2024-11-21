import { Request, Response } from "express";
import { HttpError } from "http-errors";
import { v4 as uuid } from "uuid";
import logger from "../utils/logger";

// Global Error Handler
export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response
) => {
  // Ensure res is the expected response object
  if (!(res && typeof res.status === "function")) {
    console.error("Invalid response object", res);
    return;
  }

  const errorId = uuid();
  const statusCode = err.status || 500;

  // Ensure correct production environment detection
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction ? "Internal Server Error" : err.message;

  // Log the error details for debugging
  logger.error(err.message, {
    id: errorId,
    statusCode,
    err: err.stack,
    path: req.path,
    method: req.method,
  });

  // Send the error response
  res.status(statusCode).json({
    errors: [
      {
        ref: errorId,
        type: err.name,
        msg: message,
        path: req.path,
        method: req.method,
        location: "server",
        stack: isProduction ? null : err.stack,
      },
    ],
  });
};
