import Todo from "../models/todo.model.js";

export const updateStatusController = async (req, res) => {
  try {
    const { taskId } = req.query;
    if (!taskId)
      return res.status(400).send({
        success: false,
        message: "No taskId provided to update status",
      });

    const task = await Todo.findOneAndUpdate({ _id: taskId }, [
      { $set: { isDone: { $eq: [false, "$isDone"] } } },
    ]);

    return res.status(200).send({
      success: true,
      message: "Update status",
      task,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
