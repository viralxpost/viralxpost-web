import app from "./app";
import { config } from "./config/config";
import connectDB from "./config/db";

const startServer = async () => {
  await connectDB();
  const port = config.port || 3000;

  app.listen(port, () => {
    if (config.nodeEnv === "development") {
      console.log(`Server is running on port ${port}`);
    } else {
      console.log("");
    }
  });
};

startServer();
