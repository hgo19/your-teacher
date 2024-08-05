import { getAllBooks } from "../../repository/books-mysql-repository.js";

export default async function getAllBooksService() {
  const books = await getAllBooks();
  return books;
}
