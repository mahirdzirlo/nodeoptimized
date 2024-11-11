class TimeoutError extends Error {
  status: number;

  constructor(message: string, status: number = 503) {
    super(message);
    this.status = status;
    this.name = "TimeoutError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default TimeoutError;
