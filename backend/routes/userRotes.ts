import express from "express";

import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
