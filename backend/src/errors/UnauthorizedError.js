import AbstractError from "./AbstractErrors.js";

export default class UnauthorizedError extends AbstractError {
  constructor(message) {
    super(message, 401);
    this.message = message;
  }
}
