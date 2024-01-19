import { User } from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .send({ success: false, message: "All fields required" });

    const existingUser = await User.find({ email });

    if (!existingUser)
      return res
        .status(200)
        .send({ success: true, message: "Already Registered!" });

    const newUser = await new User({
      name,
      email,
      password,
    }).save();

    return res.status(200).send({
      success: true,
      message: "User Successfully Registered!",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
