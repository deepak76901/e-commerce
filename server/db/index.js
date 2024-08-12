import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Database connection Failed : " + error);
  }
};

export default connectDB;
