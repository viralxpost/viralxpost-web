import mongoose from "mongoose";

export interface Tweet extends mongoose.Document {
  title: string;
  tags: "politics" | "tech" | "sports" | "finance" | "entertainment";
  voice:
    | "excited"
    | "professional"
    | "encouraging"
    | "casual"
    | "funny"
    | "informative"
    | "creative"
    | "passionate";
  format: string;
  content: string[];
  user: mongoose.Schema.Types.ObjectId;
}
