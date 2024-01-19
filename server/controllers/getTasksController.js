import Todo from "../models/todo.model.js";
import { User } from "../models/user.model.js";

export const getAllTasksController = async (req, res) => {
  try {
    const { taskIds } = req.query;

    if (!taskIds) {
      return res
        .status(400)
        .send({ success: false, message: "No task IDs provided" });
    }

    const taskIdArray = taskIds.split(",").map((taskId) => taskId.trim());

    const tasks = await Todo.find({ _id: { $in: taskIdArray } });

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Tasks not found" });
    }

    return res.status(200).send({ success: true, message: "Dashboard", tasks });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

//Single Task

export const getOneTaskController = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res
        .status(400)
        .send({ success: false, message: "No task IDs provided" });
    }

    const task = await Todo.find({ _id: taskId });

    if (!task || task.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Tasks not found" });
    }

    return res.status(200).send({ success: true, message: "Dashboard", task });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};
