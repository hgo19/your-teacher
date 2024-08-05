import { config } from "dotenv";
import { checkToken } from "../utils/jwt.js";
import { findUserByEmail } from "../repository/user-mysql-repository.js";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    const decoded = await checkToken(token);
    if (!decoded || !decoded.email) {
      throw new UnauthorizedError("Invalid token");
    }

    const user = await findUserByEmail(decoded.email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
