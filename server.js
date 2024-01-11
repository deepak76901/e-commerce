import express from "express";
import { createProduct } from "./controllers/product.controller.js";

const server = express();


// Middlewares
server.use(express.json())

server.get("/", (req,res) => {
    res.json({
        status : "Server Started Succefully"
    })
})

server.post("/products", createProduct)

export default server;
