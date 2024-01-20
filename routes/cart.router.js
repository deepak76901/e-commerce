import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  fetchCartByUser,
  updateCart,
} from "../controllers/cart.controller.js";

export const router = Router();

router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  // .delete("/:id", deleteFromCart)
  // .patch("/:id", updateCart);
