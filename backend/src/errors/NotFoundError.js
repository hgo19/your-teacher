import AbstractError from "./AbstractErrors";

export default class NotFoundError extends AbstractError {
  constructor(message) {
    super(message, 404);
    this.message = message;
  }
}
