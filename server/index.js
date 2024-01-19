import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import cors from "cors";
import connectDb from "./db.js";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import { authenticator } from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
app.use("/", express.static("/build"));

const PORT = process.env.PORT;

app.use("/api/users", userRouter);
app.use("/api/todo", authenticator, todoRouter);

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "./build", "index.html"));
});

connectDb();
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
