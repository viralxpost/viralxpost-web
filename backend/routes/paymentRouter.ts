import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);

export default paymentRouter;
