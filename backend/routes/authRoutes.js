import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateToken } from "../services/authService.js";

const authRouter = express.Router();

authRouter.post("/user/register" ,registerUser); // Register user
authRouter.post("/user/login", loginUser); // Login user
authRouter.get('/token/validate', validateToken)

export default authRouter;
