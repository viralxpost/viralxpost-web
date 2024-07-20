import mongoose, { Schema } from "mongoose";
import { Tweet } from "../types/tweetTypes";

const tweetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
      enum: ["politics", "tech", "sports", "finance", "entertainment"],
    },
    voice: {
      type: String,
      required: true,
      enum: [
        "excited",
        "professional",
        "encouraging",
        "casual",
        "funny",
        "informative",
        "creative",
        "passionate",
      ],
    },
    format: {
      type: String,
      required: true,
    },
    content: {
      type: String,
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

const Tweet = mongoose.model<Tweet>("Tweet", tweetSchema);

export default Tweet;
