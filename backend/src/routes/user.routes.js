import { Router } from "express";
import signUpController from "../controller/user/signup-controller.js";

const userRoute = Router();

userRoute.post("/signup", signUpController);

export default userRoute;
