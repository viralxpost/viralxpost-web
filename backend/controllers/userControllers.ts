import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import validator from "validator";
import userModel from "../models/user";
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

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken: token });
  } catch (error) {
    next(createHttpError(500, "Something went wrong"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "Please provide email and password"));
  }

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(400, "Invalid credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createHttpError(400, "Invalid credentials"));
    }

    const token = jwt.sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

export { createUser, loginUser, logoutUser };
