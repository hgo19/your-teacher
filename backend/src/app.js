import express from "express";
import userRoute from "./routes/user.routes.js";
import booksRoute from "./routes/books.routes.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/books", booksRoute);

app.use(errorHandler);

export default app;
