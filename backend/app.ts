import express from "express";
import userRouter from "./routes/userRotes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("viralxpost");
});

app.use("/api/v0/users/", userRouter);

export default app;
