import AbstractError from "./AbstractErrors.js";

export default class BadRequestError extends AbstractError {
  constructor(message) {
    super(message, 400);
    this.message = message;
  }
}
