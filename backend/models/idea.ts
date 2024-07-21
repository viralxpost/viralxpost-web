import mongoose, { Schema } from "mongoose";
import { Idea } from "../types/ideaTypes";

const ideaSchema = new Schema<Idea>(
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

const Idea = mongoose.model<Idea>("Idea", ideaSchema);

export default Idea;
