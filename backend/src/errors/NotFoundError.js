import AbstractError from "./AbstractErrors.js";

export default class NotFoundError extends AbstractError {
  constructor(message) {
    super(message, 404);
    this.message = message;
  }
}
