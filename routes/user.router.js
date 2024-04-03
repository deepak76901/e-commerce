import Router from "express";
import { fetchUserById, updateUser } from "../controllers/user.controller.js";

export const router = Router();

router
  .get("/fetchuser/:id", fetchUserById)
  .patch("/updateuser/:id", updateUser);
