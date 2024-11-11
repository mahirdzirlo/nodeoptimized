// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create indexes to speed up queries
userSchema.index({ email: 1 });

export default mongoose.model<IUser>("User", userSchema);
