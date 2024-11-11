// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import logger from "../logger"; // Assuming you have a logger module for logging

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle timeout errors specifically
  if (err.name === "TimeoutError") {
    logger.error(`Request timed out: ${req.method} ${req.originalUrl}`, {
      route: req.originalUrl,
      method: req.method,
      stack: err.stack,
    });
    res
      .status(503)
      .json({ error: "Service Unavailable", message: "Request timed out" });
  }

  // Handle operational errors (AppError)
  if (err instanceof AppError) {
    logger.error(`${err.message}`, {
      route: req.originalUrl,
      method: req.method,
      stack: err.stack,
    });
    res.status(err.statusCode).json({
      error: err.message,
      message: err.message,
    });
  }

  // Handle non-operational errors (unexpected programming errors)
  if (!err.isOperational) {
    logger.error(`Uncaught error: ${err.message}`, {
      route: req.originalUrl,
      method: req.method,
      stack: err.stack,
    });
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong! Please try again later.",
    });
  }

  // Default case for any other unhandled errors
  logger.error(`Unknown error: ${err.message}`, {
    route: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  res.status(500).json({
    error: "Internal Server Error",
    message: "An unknown error occurred.",
  });
};

export { AppError, errorHandler };
