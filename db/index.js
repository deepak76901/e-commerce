import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Database connection Failed : " + error);
  }
};

export default connectDB;
