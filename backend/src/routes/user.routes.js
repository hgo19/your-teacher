import { Router } from "express";
import signUpController from "../controller/user/signup-controller.js";
import loginController from "../controller/user/login-controller.js";

const userRoute = Router();

userRoute.post("/signup", signUpController);

userRoute.post("/login", loginController);

export default userRoute;
