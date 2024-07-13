import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import validator from "validator";
import userModel from "../models/user";
import postModel from "../models/post";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "Please provide all the required fields"));
  }

  if (!validator.isEmail(email)) {
    return next(createHttpError(400, "Invalid email format"));
  }

  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordValidation.test(password)) {
    return next(
      createHttpError(
        400,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
      )
    );
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.status(201).json({ accessToken: token });
  } catch (error) {
    next(createHttpError(500, "Something went wrong"));
  }
};

export default createUser;
