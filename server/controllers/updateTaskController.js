import Todo from "../models/todo.model.js";

export const updateTaskController = async (req, res) => {
  try {
    const { task, category } = req.body;
    const { taskId } = req.query;
    const userId = req.user.id; // Assuming you have the user ID from authentication

    if (!taskId) {
      return res.status(400).send({
        success: false,
        message: "Task ID not provided. Invalid request",
      });
    }

    if (!task) {
      return res.status(400).send({
        success: false,
        message: "No task entered. Invalid request",
      });
    }

    // Update task
    let updatedTask = await Todo.findByIdAndUpdate(
      { _id: taskId },
      { task, category }
    );

    return res.status(200).send({
      success: true,
      message: `Task with id:${updatedTask._id} Updated Successfully!!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};
