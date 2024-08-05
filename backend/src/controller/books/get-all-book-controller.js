import getAllBooksService from "../../services/book/get-all-book-service.js";

const getAllBooksController = async (req, res, next) => {
  try {
    const books = await getAllBooksService();
    return res.json(books);
  } catch (error) {
    next(error);
  }
};

export default getAllBooksController;
