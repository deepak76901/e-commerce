import { User } from "../models/User.model.js";

export const fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
      orders: user.orders,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
