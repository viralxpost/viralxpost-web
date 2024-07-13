import express from "express";

import createUser from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/register", createUser);

export default userRouter;
