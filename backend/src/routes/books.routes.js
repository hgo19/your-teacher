import { Router } from "express";
import uploadBookController from "../controller/books/upload-book-controller";
import upload from "../utils/multer";
import authMiddleware from "../middlewares/authMiddleware";

const booksRoute = Router();
booksRoute.use(authMiddleware);
const multerMiddleware = upload.single("file");

booksRoute.post("/upload", multerMiddleware, uploadBookController);

export default booksRoute;
