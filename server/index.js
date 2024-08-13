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
import { router as orderRouter } from "./routes/order.router.js";
import morgan from "morgan";
import path from "path";

dotenv.config({
  path: "./.env",
});

const app = express();
const __dirname = path.resolve();
console.log(__dirname);

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://e-commerce-client-12.vercel.app",
      "http://localhost:5137",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
  })
);

// http Requests Logs
app.use(morgan("dev"));

connectDB();

app.listen(
  process.env.PORT,
  console.log("Server is listening on PORT : " + process.env.PORT)
);

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});
