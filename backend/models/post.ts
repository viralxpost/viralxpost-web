import mongoose from "mongoose";
import { Post } from "../types/postTypes";

const postSchema = new mongoose.Schema<Post>(
  {
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },

    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Post>("Post", postSchema);
