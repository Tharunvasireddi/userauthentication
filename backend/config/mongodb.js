import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("../.env");
const connectionDb = function () {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("mongo db is connected successfully");
    })
    .catch((error) => {
      console.error("connection is failed", error);
    });
};

export { connectionDb };
