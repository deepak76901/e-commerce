import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(err);
    }
    req.user = decoded;
    next();
  });
};
