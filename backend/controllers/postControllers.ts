import { NextFunction, Request, Response } from "express";
import tweetModel from "../models/tweet";
import threadModel from "../models/thread";
import createHttpError from "http-errors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";
import ideaModel from "../models/idea";
import client from "../config/client";

// Utility function to cache data
const cacheData = async (key: string, data: any, ttl: number) => {
  await client.set(key, JSON.stringify(data), { EX: ttl });
};

// Utility function to get cached data
const getCachedData = async (key: string) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

// Utility function to delete cached data
const deleteCachedData = async (key: string) => {
  await client.del(key);
};

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
    const prompt = `Create a tweet about "${title}" focusing on the "${tags}" topic. Use a "${voice}" tone and follow this format: "${format}" and make sure don't generate same as previous posts. Ensure the tweet is concise and engaging, without using hashtags or emojis.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
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

    // Invalidate the cache for this user's tweets
    await deleteCachedData(`tweets:user:${_req.userId}`);

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
    const cacheKey = `tweets:user:${userId}`;

    // Try to get tweets from the cache
    let tweets = await getCachedData(cacheKey);

    if (!tweets) {
      tweets = await tweetModel.find({ user: userId }).populate("user", "name");

      if (!tweets || tweets.length === 0) {
        return next(createHttpError(404, "No tweets found"));
      }

      // Cache the tweets for 5 minutes
      await cacheData(cacheKey, tweets, 300);
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
    const prompt = `Create a twitter Thread about "${title}" focusing on the "${tags}" topic. Use a "${voice}" tone and follow this format: "${format}" and make sure don't generate same as previous posts. Ensure the tweet is concise and engaging, without using hashtags or emojis.`;
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

    // Invalidate the cache for this user's threads
    await deleteCachedData(`threads:user:${_req.userId}`);

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
    const cacheKey = `threads:user:${userId}`;

    // Try to get threads from the cache
    let threads = await getCachedData(cacheKey);

    if (!threads) {
      threads = await threadModel
        .find({ user: userId })
        .populate("user", "name");

      if (!threads || threads.length === 0) {
        return next(createHttpError(404, "No threads found"));
      }

      // Cache the threads for 5 minutes
      await cacheData(cacheKey, threads, 300);
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

    // Invalidate the cache for this user's tweets
    await deleteCachedData(`tweets:user:${_req.userId}`);

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

    // Invalidate the cache for this user's threads
    await deleteCachedData(`threads:user:${_req.userId}`);

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
    const prompt = `Generate concise and engaging 5 ideas for ${title} ${format} content centered on the "${tags}" topic. Use a "${voice}" tone and make sure don't generate same as previous posts. Do not include hashtags or emojis. don't add any bold text`;
    const result = await model.generateContent(prompt);
    const response = result.response;
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

    // Invalidate the cache for this user's ideas
    await deleteCachedData(`ideas:user:${_req.userId}`);

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
    const cacheKey = `ideas:user:${userId}`;

    // Try to get ideas from the cache
    let ideas = await getCachedData(cacheKey);

    if (!ideas) {
      ideas = await ideaModel.find({ user: userId }).populate("user", "name");

      if (!ideas || ideas.length === 0) {
        return next(createHttpError(404, "No ideas found"));
      }

      // Cache the ideas for 5 minutes
      await cacheData(cacheKey, ideas, 300);
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

    // Invalidate the cache for this user's ideas
    await deleteCachedData(`ideas:user:${_req.userId}`);

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
