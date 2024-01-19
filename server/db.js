import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to db!"));
};

export default connectDb;
