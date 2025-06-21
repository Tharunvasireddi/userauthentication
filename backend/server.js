import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./config/mongodb.js";
import {
  adminRouter,
  deleteImageRouter,
  getAllImagesRouter,
  getSingleImageRouter,
  loginRouter,
  protectMiddlewareRouter,
  registerRouter,
  uploadImageRouter,
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
app.use("/api/auth", adminRouter);
app.use("/api/auth", uploadImageRouter);
app.use("/api/auth", getAllImagesRouter);
app.use("/api/auth", getSingleImageRouter);
app.use("/api/auth", deleteImageRouter);
const port = process.env.PORT || 4000;

export default app;
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server is now running on ${port}`);
  });
}
