import express from "express";
import { fetchAll, updateOrder } from "../controllers/order.controller.js";

export const router = express.Router();

router.get("/fetchAll", fetchAll).patch("/update/:id", updateOrder);
