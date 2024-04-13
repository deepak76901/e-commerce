import { Router } from "express";
import { createUser, logInUser } from "../controllers/auth.controller.js";

export const router = Router();

router
  .post("/signup", createUser)
  .post("/signin", logInUser);
