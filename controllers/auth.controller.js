import { User } from "../models/User.model.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(200).json({name: doc.name,email:doc.email});
  } catch (error) {
    res.status(400).json(error);
  }
};

export const logInUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email }
    ).exec();
    console.log({user})

    if (!user) {
      res.status(400).json({ message: "no such user exist" });
    } else if (user.password === req.body.password) {
      res.status(200).json({id:user.id,email:user.email,name:user.name, addresses:user.addresses});
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
