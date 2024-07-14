import mongoose from "mongoose";

export interface Thread extends mongoose.Document {
    title: string;
    tags: "politics" | "tech" | "sports" | "finance" | "entertainment";
    voice: "excited" | "professional" | "encouraging" | "casual" | "funny" | "informative" | "creative" | "passionate";
    format: string[];
    content: string[];
}