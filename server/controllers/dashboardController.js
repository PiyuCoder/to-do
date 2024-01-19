import { User } from "../models/user.model.js";

export const dashboardController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "No user ID provided" });
    }

    const user = await User.findOne({ _id: userId });

    return res.status(200).send({
      success: true,
      message: "Fetched the taskdata successfully!",
      taskdata: user.taskdata,
      name: user.name,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};
