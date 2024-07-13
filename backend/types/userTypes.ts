import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  posts: mongoose.Schema.Types.ObjectId[];
}
