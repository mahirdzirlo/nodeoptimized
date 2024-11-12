// src/models/User.ts
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Compound index
userSchema.index({ email: 1, name: 1 });

const User = mongoose.model('User', userSchema);

export default User;
