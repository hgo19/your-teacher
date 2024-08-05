import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

async function hashPassword(password) {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
}

async function testPassword(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}

export { hashPassword, testPassword };
