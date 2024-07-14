import { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet";
import createHttpError from "http-errors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config";

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
  res.json({ message: "Get all tweets" });
};

const createThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Create a new thread" });
};

const getAllThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "Get all threads" });
};

export { createTweets, getAllTweets, createThreads, getAllThreads };
