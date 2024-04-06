import Router from "express";
import {
  fetchUserById,
  updateUserAddress,
} from "../controllers/user.controller.js";

export const router = Router();

router
  .get("/fetchuser/:id", fetchUserById)
  .put("/updateAddress/:userId", updateUserAddress);
