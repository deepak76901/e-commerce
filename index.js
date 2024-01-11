import dotenv from "dotenv";
import server from "./server.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()


server.listen(
  process.env.PORT,
  console.log("Server is listening on PORT : " + process.env.PORT + ` : http://localhost:${process.env.PORT}`)
);
