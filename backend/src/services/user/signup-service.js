import BadRequestError from "../../errors/BadRequestError.js";
import { saveUser } from "../../repository/user-mysql-repository.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";

async function signUpService(input) {
  const { name, email, password } = input;
  userValidations(input);
  const hashedPassword = await hashPassword(password);
  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  await saveUser(userData);

  const generatedToken = generateToken({
    name: userData.name,
    email: userData.email,
  });

  return generatedToken;
}

function userValidations(input) {
  const { name, email, password, passwordConfirmation } = input;

  const properties = Object.entries(input);

  for (const [key, value] of properties) {
    if (typeof value !== "string") {
      throw new BadRequestError(`Property ${key} value needs to be a string`);
    }
  }

  const emailRgx = /\S+@\S+\.\S+/;
  if (name.length < 3) {
    throw new BadRequestError("Name is invalid.");
  }

  if (!emailRgx.test(email)) {
    throw new BadRequestError("Email is invalid");
  }

  if (password !== passwordConfirmation) {
    throw new BadRequestError(
      "Password and password confirmation are different",
    );
  }
}

export default signUpService;
