class AbstractError extends Error {
  constructor(message, statusCode) {
    if (new.target === AbstractError) {
      throw new TypeError("Cannot construct AbstractError instances directly");
    }
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AbstractError;
