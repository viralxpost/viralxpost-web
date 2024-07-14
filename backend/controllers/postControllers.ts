import { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet";
import threadModel from "../models/thread";
import createHttpError from "http-errors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";

const createTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, tags, voice, format } = req.body;
  const genAI = new GoogleGenerativeAI(config.geminiApi as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (!title || !tags || !voice || !format) {
    return next(createHttpError(400, "All fields are required"));
  }
  const _req = req as AuthRequest;
  try {
    const prompt = `Write a tweet about ${title} on ${tags} topic in ${voice} in ${format}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    const newTweet = await tweetModel.create({
      title,
      tags,
      voice,
      format,
      content: text,
      user: _req.userId,
    });

    res
      .status(201)
      .json({ message: "tweet created successfully", tweet: newTweet });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  try {
    const userId = _req.userId;

    const tweets = await tweetModel
      .find({ user: userId })
      .populate("user", "name");

    if (!tweets || tweets.length === 0) {
      return next(createHttpError(404, "No tweets found"));
    }

    res.status(200).json({ tweets });
  } catch (error) {
    next(createHttpError(500, "Something went wrong"));
  }
};

const createThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, tags, voice, format } = req.body;
  const genAI = new GoogleGenerativeAI(config.geminiApi as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (!title || !tags || !voice || !format) {
    return next(createHttpError(400, "All fields are required"));
  }
  const _req = req as AuthRequest;
  try {
    const prompt = `Write a 5 length thread about ${title} on ${tags} topic in ${voice} in ${format}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    const newThread = await threadModel.create({
      title,
      tags,
      voice,
      format,
      content: text,
      user: _req.userId,
    });

    res
      .status(201)
      .json({ message: "Thread created successfully", thread: newThread });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong"));
  }
};

const getAllThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Get all threads" });
};

export { createTweets, getAllTweets, createThreads, getAllThreads };
