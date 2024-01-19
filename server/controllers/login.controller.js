import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ success: false, message: "All fields required" });

    const user = await User.findOne({ email });

    const isPassword = await bcrypt.compare(password, user.password);
    console.log(isPassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    if (!user || !isPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid Credential" });

    await res.header("jwt", token);

    user.email = undefined;
    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: "User Successfully Loggedin!",
      user,
      token,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid Credential" });
  }
};
