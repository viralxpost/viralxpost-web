import { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet";
import threadModel from "../models/thread";
import createHttpError from "http-errors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";
import ideaModel from "../models/idea";

// Create tweet Logic

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
    const prompt = `Create a tweet about "${title}" focusing on the "${tags}" topic. Use a "${voice}" tone and follow this format: "${format}". Ensure the tweet is concise and engaging, without using hashtags or emojis.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (config.nodeEnv === "development") {
      console.log(text);
    } else {
      console.log("");
    }

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
    return next(
      createHttpError(500, "Failed to create tweet. Please try again later.")
    );
  }
};

// Get all tweets Logic

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
    next(
      createHttpError(500, "Failed to fetch tweets. Please try again later.")
    );
  }
};

// Create thread Logic

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
    const prompt = `Create a twitter Thread about "${title}" focusing on the "${tags}" topic. Use a "${voice}" tone and follow this format: "${format}". Ensure the tweet is concise and engaging, without using hashtags or emojis.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (config.nodeEnv === "development") {
      console.log(text);
    } else {
      console.log("");
    }

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
    return next(
      createHttpError(500, "Failed to create thread. Please try again later.")
    );
  }
};

// Get all threads logic

const getAllThreads = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  try {
    const userId = _req.userId;

    const threads = await threadModel
      .find({ user: userId })
      .populate("user", "name");

    if (!threads || threads.length === 0) {
      return next(createHttpError(404, "No threads found"));
    }

    res.status(200).json({ threads });
  } catch (error) {
    next(
      createHttpError(500, "Failed to fetch thread. Please try again later.")
    );
  }
};

// Delete tweet logic

const deleteTweet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const _req = req as AuthRequest;
  try {
    const tweet = await tweetModel.findOneAndDelete({
      _id: id,
      user: _req.userId,
    });
    if (!tweet) {
      return next(createHttpError(404, "Tweet not found"));
    }
    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    return next(createHttpError(500, "Failed to delete tweet"));
  }
};

// Delete thread logic

const deleteThread = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const _req = req as AuthRequest;
  try {
    const thread = await threadModel.findOneAndDelete({
      _id: id,
      user: _req.userId,
    });
    if (!thread) {
      return next(createHttpError(404, "Thread not found"));
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    return next(createHttpError(500, "Failed to delete Thread"));
  }
};

// Create idea logic

const createIdeas = async (req: Request, res: Response, next: NextFunction) => {
  const { title, tags, voice, format } = req.body;
  const genAI = new GoogleGenerativeAI(config.geminiApi as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (!title || !tags || !voice || !format) {
    return next(createHttpError(400, "All fields are required"));
  }
  const _req = req as AuthRequest;
  try {
    const prompt = `Generate ideas for tweets about "${title}" focusing on the "${tags}" topic. Use a "${voice}" tone and follow this format: "${format}". Ensure the ideas are concise, engaging, and without using hashtags or emojis.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    if (config.nodeEnv === "development") {
      console.log(text);
    } else {
      console.log("");
    }

    const newIdea = await ideaModel.create({
      title,
      tags,
      voice,
      format,
      content: text,
      user: _req.userId,
    });

    res
      .status(201)
      .json({ message: "Idea created successfully", idea: newIdea });
  } catch (error) {
    return next(
      createHttpError(500, "Failed to create idea. Please try again later.")
    );
  }
};

// get all ideas logic

const getAllIdeas = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req as AuthRequest;
  try {
    const userId = _req.userId;

    const ideas = await ideaModel
      .find({ user: userId })
      .populate("user", "name");

    if (!ideas || ideas.length === 0) {
      return next(createHttpError(404, "No ideas found"));
    }

    res.status(200).json({ ideas });
  } catch (error) {
    next(
      createHttpError(500, "Failed to fetch ideas. Please try again later.")
    );
  }
};

// Delete idea logic

const deleteIdea = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const _req = req as AuthRequest;
  try {
    const idea = await ideaModel.findOneAndDelete({
      _id: id,
      user: _req.userId,
    });
    if (!idea) {
      return next(createHttpError(404, "Idea not found"));
    }
    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    return next(createHttpError(500, "Failed to delete Idea"));
  }
};

export {
  createTweets,
  getAllTweets,
  createThreads,
  getAllThreads,
  deleteTweet,
  deleteThread,
  createIdeas,
  getAllIdeas,
  deleteIdea,
};
