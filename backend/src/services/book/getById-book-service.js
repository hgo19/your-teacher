import { getBookById } from "../../repository/books-mysql-repository.js";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

export default async function getBookByIdService(id) {
  if (typeof id !== "number" || id <= 0) {
    throw new BadRequestError("Invalid book ID");
  }

  const book = await getBookById(id);
  if (!book) {
    throw new NotFoundError(`Book with ID ${id} not found`);
  }

  return book;
}
