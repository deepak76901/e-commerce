import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  fetchCart,
  fetchCartByUser,
  updateCart,
} from "../controllers/cart.controller.js";

export const router = Router();

router
  .get("/", fetchCartByUser)
  .post("/addToCart", addToCart)
  .get("/fetchCart", fetchCart)
  .delete("/deleteItem/:id", deleteFromCart)
  .patch("/:id", updateCart);
