import loginService from "../../services/user/login-service.js";

const loginController = async (req, res, next) => {
  try {
    const loginData = req.body;
    const token = await loginService(loginData);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginController;
