import deleteBookByIdService from "../../services/book/delete-book-service.js";

const deleteBookByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteBookByIdService(Number(id));
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default deleteBookByIdController;
