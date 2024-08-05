import { uploadBookService } from "../../services/book/upload-book-service.js";

const uploadBookController = async (req, res, next) => {
  try {
    const data = req.body;
    await uploadBookService({ ...data, file: req.file });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export default uploadBookController;
