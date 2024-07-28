import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRouter";
import authRouter from "./routes/authRouter";
import cors from "cors";
import { config } from "./config/config";
import passport from "passport";
import expressSession from "express-session"

require("./config/googleStratergy")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const options = {
  origin: config.frontendDomain,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(options));
app.use(expressSession({
  secret: config.expressSessionSecret as string,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("viralxpost");
});

app.use("/api/v0/users/", userRouter);
app.use("/api/v0/posts/", postRouter);
app.use("/auth", authRouter)

//gloabl error handler
app.use(globalErrorHandler);

export default app;
