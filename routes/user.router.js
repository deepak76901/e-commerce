import Router from "express";
import {
  createOrder,
  fetchUserById,
  fetchUserOrders,
  updateUser,
} from "../controllers/user.controller.js";

export const router = Router();

router
  .get("/fetchuser/:id", fetchUserById)
  .patch("/updateUser/:userId", updateUser)
  .post("/createOrder/:userId", createOrder)
  .get("/orders/:userId",fetchUserOrders)
