import BadRequestError from "../../errors/BadRequestError.js";
import { findUserByEmail } from "../../repository/user-mysql-repository.js";
import { testPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";

async function loginService(input) {
  const { email, password } = input;

  if (!email || !password) throw new BadRequestError("Invalid credentials");

  const findUser = await findUserByEmail(email);

  if (!findUser) throw new BadRequestError("Invalid email");

  const isPasswordValid = await testPassword(password, findUser.password);

  if (!isPasswordValid) throw new BadRequestError("Invalid password");

  const generatedToken = generateToken({
    name: findUser.name,
    email: findUser.email,
  });

  return generatedToken;
}

export default loginService;
