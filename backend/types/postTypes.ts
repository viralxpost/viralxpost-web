import mongoose from "mongoose";

export interface Post extends mongoose.Document {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
}
