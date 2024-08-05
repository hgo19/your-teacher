import {
  deleteBookById,
  getBookById,
} from "../../repository/books-mysql-repository.js";
import deleteFile from "../../utils/deleteFile.js"; // Importe a função de exclusão de arquivos
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";
import path from "path";

export default async function deleteBookByIdService(id) {
  if (typeof id !== "number" || id <= 0) {
    throw new BadRequestError("Invalid book ID");
  }

  const book = await getBookById(id);

  if (!book) {
    throw new NotFoundError(`Book with ID ${id} not found`);
  }

  const filePath = path.join("public", "uploads", path.basename(book.fileUrl));
  const success = await deleteBookById(id);

  if (success) {
    console.log("Aqui");
    await deleteFile(filePath);
  }

  return success;
}
