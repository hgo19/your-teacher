import { Router } from "express";
import uploadBookController from "../controller/books/upload-book-controller.js";
import upload from "../utils/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const booksRoute = Router();
booksRoute.use(authMiddleware);
const multerMiddleware = upload.single("file");

booksRoute.post("/upload", multerMiddleware, uploadBookController);

export default booksRoute;
