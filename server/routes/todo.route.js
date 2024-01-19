import express from "express";
import { dashboardController } from "../controllers/dashboardController.js";
import { authenticator } from "../middlewares/auth.middleware.js";
import { todoController } from "../controllers/todoController.js";
import {
  deleteSingleTodoController,
  deleteTodoController,
} from "../controllers/deleteTodoController.js";
import {
  getAllTasksController,
  getOneTaskController,
} from "../controllers/getTasksController.js";
import { updateStatusController } from "../controllers/updateStatusController.js";
import { updateTaskController } from "../controllers/updateTaskController.js";

const todoRouter = express.Router();

todoRouter
  .get("/dashboard", dashboardController)
  .post("/dashboard", todoController)
  .delete("/dashboard", deleteTodoController);

todoRouter.delete("/dashboard/single", deleteSingleTodoController);

todoRouter.get("/dashboard/tasks", getAllTasksController);

todoRouter.get("/dashboard/task", getOneTaskController);

todoRouter.patch("/dashboard/status", updateStatusController);

todoRouter.put("/dashboard/update", updateTaskController);

export default todoRouter;
