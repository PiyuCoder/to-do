import express from "express";
import { registerController } from "../controllers/register.controller.js";
import { loginController } from "../controllers/login.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

export default userRouter;
