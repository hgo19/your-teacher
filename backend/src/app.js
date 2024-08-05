import express from "express";
import userRoute from "./routes/user.routes.js";
import booksRoute from "./routes/books.routes.js";
import cors from "cors";
import { ErrorHandler } from "./middlewares/errorHandler.js";
import teacherRoute from "./routes/teacher.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/books", booksRoute);
app.use("/teacher", teacherRoute);

app.use(ErrorHandler);

export default app;
