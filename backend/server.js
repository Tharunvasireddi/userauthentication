import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./config/mongodb.js";
import {
  loginRouter,
  protectMiddlewareRouter,
  registerRouter,
} from "./routes/auth-router.js";
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connectionDb();

// routers
app.use("/api/auth", registerRouter);
app.use("/api/auth", loginRouter);
app.use("/api/auth", protectMiddlewareRouter);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is now running on ${port}`);
});
