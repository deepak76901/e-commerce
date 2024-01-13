import Router from "express";
import { fetchUserById, updateUser } from "../controllers/user.controller.js";

export const router = Router();

router.get("/:id", fetchUserById).patch("/:id", updateUser);
