import express from "express";
import userRouter from "./routes/userRotes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("viralxpost");
});

app.use("/api/v0/users/", userRouter);
app.use("/api/v0/posts/", userRouter);

//gloabl error handler
app.use(globalErrorHandler);

export default app;
