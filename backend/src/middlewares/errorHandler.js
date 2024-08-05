import AbstractError from "../errors/AbstractErrors";

export const ErrorHandler = (error, req, res) => {
  console.log(error);
  if (error instanceof AbstractError) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: "Internal server error" });
};
