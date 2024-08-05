import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploadMiddleware from "../utils/multer.js";
import teacherAnswerController from "../controller/teacher/teacher-answer-controller.js";

const teacherRoute = Router();
teacherRoute.use(authMiddleware);

teacherRoute.post("/ask", uploadMiddleware, teacherAnswerController);

export default teacherRoute;
