import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRouter";
import authRouter from "./routes/authRouter";
import cors from "cors";
import { config } from "./config/config";
import passport from "passport";
import expressSession from "express-session";
import paymentRouter from "./routes/paymentRouter";
import axios from "axios";

require("./config/googleStratergy");

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
app.use(
  expressSession({
    secret: config.expressSessionSecret as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v0/users/", userRouter);
app.use("/api/v0/posts/", postRouter);
app.use("/auth", authRouter);
app.use("/api/payments", paymentRouter);

//gloabl error handler
app.use(globalErrorHandler);

const url = config.backendUrl as string;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

export default app;
