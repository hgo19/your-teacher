export const ErrorHandler = (error, req, res) => {
  console.log(error);
  return res.status(500).json({ message: error.message });
};
