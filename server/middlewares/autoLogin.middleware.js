import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const autoLogging = async (req, res, next) => {
  const cookie = req.cookies["access_token"];
  try {
    if (!cookie) {
      return res.status(400).json({ message: "Cookie doesnot exist." });
    }

    const decoded = await jwt.verify(cookie, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { autoLogging };
