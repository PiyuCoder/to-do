import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "not selected",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Todo = new mongoose.model("Todo", todoSchema);

export default Todo;
