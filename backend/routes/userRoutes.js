import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";


const userRouter = express.Router();

userRouter.get('/profile',protect,userController.getUserProfile)
userRouter.get('/profile/getPhoneNumber',protect,userController.getUserPhoneNumner)



export default userRouter;
