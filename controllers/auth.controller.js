import { User } from "../models/User.model.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const docs = await user.save();
    res.status(201).json(docs);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const logInUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email }
    ).exec();
    console.log({user})

    if (!user) {
      res.status(404).json({ message: "no such user exist" });
    } else if (user.password === req.body.password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(402).json(error);
  }
};
