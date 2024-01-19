import Todo from "../models/todo.model.js";
import { User } from "../models/user.model.js";

export const deleteTodoController = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    const taskData = await User.updateOne(
      { _id: userId },
      { $set: { taskdata: [] } }
    );

    return res
      .status(200)
      .send({
        success: true,
        message: "All Tasks have been deleted successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Unable to delete all tasks, server error",
      });
  }
};

export const deleteSingleTodoController = async (req, res) => {
  try {
    const { taskId } = req.query;
    const userId = req.user.id;

    await User.updateOne({ _id: userId }, { $pull: { taskdata: taskId } });

    // Delete the task from the Todo model
    await Todo.deleteOne({ _id: taskId });

    console.log("Task deleted successfully.");

    return res
      .status(200)
      .send({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Unable to delete, server error" });
  }
};
