import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db.js";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import { authenticator } from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/users", userRouter);
app.use("/api/todo", authenticator, todoRouter);

connectDb();
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
