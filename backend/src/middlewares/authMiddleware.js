import { config } from "dotenv";
import { checkToken } from "../utils/jwt";
import { findUserByEmail } from "../repository/user-mysql-repository";
config();

const authMiddleware = async (req, _res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      throw new Error("No token provided");
    }

    const { email } = checkToken(token);
    const findUser = await findUserByEmail(email);
    if (!findUser) throw new Error("User not found");

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
