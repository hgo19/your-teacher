import { Router } from "express";
import uploadBookController from "../controller/books/upload-book-controller";
import upload from "../utils/multer";

const booksRoute = Router();
const multerMiddleware = upload.single("file");

booksRoute.post("/upload", multerMiddleware, uploadBookController);

export default booksRoute;
