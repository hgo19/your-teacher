import AbstractError from "./AbstractErrors";

export default class UnauthorizedError extends AbstractError {
  constructor(message) {
    super(message, 401);
    this.message = message;
  }
}
