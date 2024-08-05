export const errorHandler = (req, res, next, error) => {
  console.log(error);
  return res.status(500).json({ message: error.message });
};
