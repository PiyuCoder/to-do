import Todo from "../models/todo.model.js";
import { User } from "../models/user.model.js";

export const todoController = async (req, res) => {
  try {
    const { task, category } = req.body;
    const userId = req.user.id; // Assuming you have the user ID from authentication

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID not provided. Invalid request",
      });
    }

    if (!task) {
      return res.status(400).send({
        success: false,
        message: "No task entered. Invalid request",
      });
    }

    // Create a new task
    let newTask = await new Todo({ task, category }).save();

    // Update the user's taskdata with the new task ID
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { taskdata: newTask._id } },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Task Added Successfully!!",
      newTask,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};
