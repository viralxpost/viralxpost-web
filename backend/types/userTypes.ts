import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}
