import express from "express";
import { loginHandler, signupHandler } from "../controllers/user.Controller.js";
const userRouter = express.Router();


userRouter.post('/signup' , signupHandler);
userRouter.post('/login', loginHandler);

export default userRouter;