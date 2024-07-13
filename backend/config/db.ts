import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    mongoose.connection.on("connected", () => {
      console.log("Connected to Database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in Connecting to Database", err);
    });
  } catch (error) {
    console.log("Failed to connect to Database");
    process.exit(1);
  }
};

export default connectDB;