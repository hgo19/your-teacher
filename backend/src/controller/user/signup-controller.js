import signUpService from "../../services/user/signup-service.js";

const signUpController = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await signUpService(user);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export default signUpController;
