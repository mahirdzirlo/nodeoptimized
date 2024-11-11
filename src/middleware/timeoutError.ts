// src/middleware/TimeoutError.ts
class TimeoutError extends Error {
  status: number;

  constructor(message: string, status: number = 503) {
    super(message);
    this.status = status; // Set the status code (default 503 for timeout errors)
    this.name = "TimeoutError"; // Set the name of the error for identification
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}

export default TimeoutError;
