import { findUserByEmail } from "../../repository/user-mysql-repository.js";
import { testPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";

async function loginService(input) {
  const { email, password } = input;

  if (!email || !password) throw new Error("Invalid credentials");

  const findUser = await findUserByEmail(email);

  if (!findUser) throw new Error("Invalid email");

  const isPasswordValid = await testPassword(password, findUser.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const generatedToken = generateToken({
    name: findUser.name,
    email: findUser.email,
  });

  return generatedToken;
}

export default loginService;
