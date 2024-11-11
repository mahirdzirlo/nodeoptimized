// src/config.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || "", {
      maxPoolSize: 50, 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
