import mongoose from "mongoose";
import { Post } from "../types/postTypes";

const postSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
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
