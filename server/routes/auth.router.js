import { Router } from "express";
import { createUser, logInUser } from "../controllers/auth.controller.js";
import { autoLogging } from "../middlewares/autoLogin.middleware.js";

export const router = Router();

router
  .post("/signup", createUser)
  .post("/signin", logInUser)
  .get("/auto-login", autoLogging, (req, res) => {
    // let rest =  req.user._doc
    const userData = req.user.toObject();
    return res
      .status(200)
      .json({ rest: userData, message: "Auto Login Successfull." });
  });
