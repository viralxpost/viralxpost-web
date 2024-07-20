import express from "express";
import {
  createThreads,
  createTweets,
  deleteTweet,
  getAllThreads,
  getAllTweets,
} from "../controllers/postControllers";
import authenticate from "../middlewares/authenticate";

const postRouter = express.Router();

postRouter.get("/tweets", authenticate, getAllTweets);
postRouter.delete("/tweets/:id", authenticate, deleteTweet);
postRouter.get("/threads", authenticate, getAllThreads);
postRouter.post("/tweets", authenticate, createTweets);
postRouter.post("/threads", authenticate, createThreads);

export default postRouter;
