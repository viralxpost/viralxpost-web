import mongoose from "mongoose";

export interface Post extends mongoose.Document {
  tweet: mongoose.Schema.Types.ObjectId;
  thread: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
