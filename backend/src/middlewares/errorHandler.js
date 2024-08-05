import AbstractError from "../errors/AbstractErrors.js";

// eslint-disable-next-line no-unused-vars
export const ErrorHandler = (error, req, res, _next) => {
  console.log("AQUIII");
  console.log(error);
  if (error instanceof AbstractError) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: "Internal server error" });
};
