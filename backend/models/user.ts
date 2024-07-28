import mongoose from "mongoose";
import { User } from "../types/userTypes";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Use a function to conditionally require the password
      required: function (this: User) {
        return !this.googleId; // If there's no Google ID, password is required
      },

    },
    googleId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
