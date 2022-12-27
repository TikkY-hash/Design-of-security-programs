import mongoose, { Types } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    default: false,
  }
});

export const User = mongoose.model('User', userSchema);
