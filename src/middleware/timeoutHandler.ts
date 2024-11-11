// src/middleware/timeoutHandler.ts
import { Request, Response, NextFunction } from "express";
import TimeoutError from "./timeoutError";

const timeoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If the request times out, throw an error to be caught by the global error handler
  if (req.timedout) {
    const timeoutError = new TimeoutError("Request timed out");
    timeoutError.name = "TimeoutError"; // Optionally name the error
    timeoutError.status = 503; // You can set custom status code for timeout errors
    return next(timeoutError); // Pass the error to the next middleware (global error handler)
  }
  next();
};

export default timeoutHandler;
