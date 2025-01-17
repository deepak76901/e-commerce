import { User } from "../models/User.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email === "" ||
    username === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, password: hashedPassword });
  try {
    const data = await newUser.save();
    res.status(200).json({
      success: "Signup Successfully",
      data: { username: data.username, email: data.email },
    });
  } catch (error) {
    next(error);
  }
};

export const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    // console.log(ValidUser);
    if (!validUser) {
      return next(errorHandler(400, "No such user exists"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Entered Password is wrong"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    // console.log("Here is Monggose power ",validUser._doc);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .json({ rest, token });
      // .cookie("access_token", token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
      // })
  } catch (error) {
    next(error);
  }
};
