import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const secret = process.env.SECRET_KEY;

export async function generateToken(payload) {
  const generatedToken = jwt.sign(payload, secret, {
    expiresIn: "2h",
    algorithm: "HS256",
  });
  return generatedToken;
}

export async function checkToken(token) {
  const checkToken = jwt.verify(token, secret);
  return checkToken;
}
