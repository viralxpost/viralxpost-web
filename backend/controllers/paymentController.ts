import Razorpay from "razorpay";
import { Request, Response } from "express";
import { config } from "../config/config";
import crypto from "crypto";
import { pricingPlans } from "../models/payment";

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId as string,
  key_secret: config.razorpayKeySecret as string,
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { plan }: { plan: string } = req.body;

    // Validate the plan
    if (!pricingPlans[plan]) {
      console.log("Invalid plan selected");
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // Get the amount based on the selected plan
    const amount = pricingPlans[plan];

    // Free plan does not require payment
    if (amount === 0) {
      return res.status(200).json({ message: "Free plan selected" });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Capture payment immediately
    };

    const order = await razorpay.orders.create(options);

    // Check if order creation was successful
    if (!order || order.status !== "created") {
      console.log("Failed to create order");
      return res.status(500).json({ message: "Failed to create order" });
    }

    // Send order details as response
    res.status(200).json(order);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const verifyPayment = (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hmac = crypto.createHmac(
      "sha256",
      config.razorpayKeySecret as string
    );
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
