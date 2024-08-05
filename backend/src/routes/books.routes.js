import { Router } from "express";
import uploadBookController from "../controller/books/upload-book-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploadMiddleware from "../utils/multer.js";
import getAllBooksController from "../controller/books/get-all-book-controller.js";
import getBookByIdController from "../controller/books/getById-book-controller.js";
import deleteBookByIdController from "../controller/books/delete-book-controller.js";

const booksRoute = Router();
booksRoute.use(authMiddleware);

booksRoute.post("/upload", uploadMiddleware, uploadBookController);

booksRoute.get("/", getAllBooksController);

booksRoute.get("/:id", getBookByIdController);

booksRoute.delete("/:id", deleteBookByIdController);

export default booksRoute;
