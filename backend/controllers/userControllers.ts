import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import validator from "validator";
import userModel from "../models/user";
import { config } from "../config/config";
import client from "../config/client";

// Check user already exists

const checkEmailExists = async (email: string): Promise<boolean> => {
  const cacheKey = `user:email:${email}`;
  const cachedResult = await client.get(cacheKey);

  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  const user = await userModel.findOne({ email });
  await client.set(cacheKey, JSON.stringify(user !== null), {
    EX: 300, // Cache expires in 5 minutes
  });

  return user !== null;
};

const cacheUser = async (email: string, user: any) => {
  const cacheKey = `user:email:${email}`;
  await client.set(cacheKey, JSON.stringify(user), {
    EX: 300, // Cache expires in 5 minutes
  });
};

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
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
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

    // Invalidate the cached email existence check after successful registration
    const cacheKey = `user:email:${email}`;
    await client.del(cacheKey);
  } catch (error) {
    next(
      createHttpError(500, "Failed to create user. Please try again later.")
    );
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "Please provide both email and password"));
  }

  try {
    const cacheKey = `user:email:${email}`;
    const cachedUser = await client.get(cacheKey);

    let user;
    if (cachedUser) {
      user = JSON.parse(cachedUser);
    } else {
      user = await userModel.findOne({ email });

      if (!user) {
        return next(
          createHttpError(400, "User not found. Please check your email.")
        );
      }

      await cacheUser(email, user);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createHttpError(400, "Incorrect email or password"));
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
    return next(
      createHttpError(
        500,
        "Unable to process login request. Please try again later."
      )
    );
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      const decodedToken: any = jwt.verify(token, config.jwtSecret as string);
      const userId = decodedToken.sub;
      const user = await userModel.findById(userId);

      if (user) {
        const cacheKey = `user:email:${user.email}`;
        await client.del(cacheKey);
      }
    }

    res.clearCookie("accessToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    return next(
      createHttpError(500, "Failed to log out. Please try again later.")
    );
  }
};

export { createUser, loginUser, logoutUser };
