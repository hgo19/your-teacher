import { Router } from "express";
import uploadBookController from "../controller/books/upload-book-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploadMiddleware from "../utils/multer.js";

const booksRoute = Router();
booksRoute.use(authMiddleware);

booksRoute.post("/upload", uploadMiddleware, uploadBookController);

export default booksRoute;
