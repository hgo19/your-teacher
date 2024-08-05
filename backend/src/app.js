import express from "express";
import userRoute from "./routes/user.routes.js";
import booksRoute from "./routes/books.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/books", booksRoute);

export default app;
