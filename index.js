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

const server = express();

// Middlewares
server.use(express.json());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(morgan("dev"));

connectDB();

server.listen(
  process.env.PORT,
  console.log(
    "Server is listening on PORT : " +
      process.env.PORT +
      ` : http://localhost:${process.env.PORT}`
  )
);

server.get("/", (req, res) => {
  res.json({
    status: "Server Started Successfully",
  });
});

server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/cart", cartRouter);