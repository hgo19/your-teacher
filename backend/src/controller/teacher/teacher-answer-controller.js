import { teacherAnswerService } from "../../services/teacher/teacher-answer-service.js";

const teacherAnswerController = async (req, res, next) => {
  try {
    const { question } = req.body;
    const answer = await teacherAnswerService(question);
    return res.status(201).json({ message: answer });
  } catch (error) {
    next(error);
  }
};

export default teacherAnswerController;
