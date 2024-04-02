import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { router as productRouter } from "./routes/product.router.js";
import { router as categoryRouter } from "./routes/category.router.js";
import { router as brandRouter } from "./routes/brand.router.js";
import { router as userRouter } from "./routes/user.router.js";
import { router as authRouter } from "./routes/auth.router.js";
import { router as cartRouter } from "./routes/cart.router.js";
import morgan from "morgan";

dotenv.config({
  path: "./.env",
});

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(morgan("dev"));

connectDB();

app.listen(
  process.env.PORT,
  console.log("Server is listening on PORT : " + process.env.PORT)
);

app.get("/", (req, res) => {
  res.json({
    status: "app Started Successfully",
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});
