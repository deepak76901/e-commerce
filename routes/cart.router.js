import { Router } from "express";
import { addToCart, fetchCartByUser } from "../controllers/cart.controller.js";

export const router = Router();

router.get("/", fetchCartByUser).post("/addToCart/:productId", addToCart);
// .delete("/:id", deleteFromCart)
// .patch("/:id", updateCart);
