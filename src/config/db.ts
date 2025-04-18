import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/users_db');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongooseServerSelectionError:', err);
    process.exit(1);
  }
};
