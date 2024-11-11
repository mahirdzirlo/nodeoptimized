import { Request, Response, NextFunction } from "express";
import TimeoutError from "./timeoutError";

const timeoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.timedout) {
    const timeoutError = new TimeoutError("Request timed out");
    timeoutError.name = "TimeoutError";
    timeoutError.status = 503;
    return next(timeoutError);
  }
  next();
};

export default timeoutHandler;
