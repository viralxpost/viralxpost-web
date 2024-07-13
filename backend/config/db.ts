import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("Connected to Database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error in Connecting to Database:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from Database");
    });

    await mongoose.connect(config.databaseUrl as string);
  } catch (error) {
    console.error("Failed to connect to Database:", error);
    process.exit(1);
  }
};

export default connectDB;
