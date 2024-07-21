import mongoose, { Schema } from "mongoose";

const ideaSchema = new Schema(
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

const Idea = mongoose.model("Thread", ideaSchema);

export default Idea;
