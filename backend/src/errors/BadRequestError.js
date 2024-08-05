import AbstractError from "./AbstractErrors";

export default class BadRequestError extends AbstractError {
  constructor(message) {
    super(message, 400);
    this.message = message;
  }
}
