import getBookByIdService from "../../services/book/getById-book-service.js";

const getBookByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await getBookByIdService(Number(id));
    return res.json(book);
  } catch (error) {
    next(error);
  }
};

export default getBookByIdController;
