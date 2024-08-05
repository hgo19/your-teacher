import { saveBook } from "../../repository/books-mysql-repository.js";
import path from "path";
import saveFile from "../../utils/saveFile.js";

export async function uploadBookService(data) {
  bookValidations(data);
  const uploadDir = path.join("..", "..", "..", "uploads");
  const filePath = path.join(
    uploadDir,
    `${Date.now()}-${data.file.originalname}`,
  );

  const bookData = {
    author: data.author,
    title: data.title,
    publishedAt: data.publishedAt,
    fileUrl: filePath,
  };

  await saveBook(bookData);

  await saveFile(data.file);
}

function bookValidations(data) {
  const properties = Object.entries(data);

  for (const [key, value] of properties) {
    if (!value) {
      throw new Error(`Property ${key} is missing`);
    }

    if (key !== "file" && typeof value !== "string") {
      throw new Error(`Property ${key} value needs to be a string`);
    }
  }
}
