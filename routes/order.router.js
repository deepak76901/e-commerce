import express from "express";
import { fetchAll } from "../controllers/order.controller.js";

export const router = express.Router()

router.get("/fetchAll",fetchAll)

