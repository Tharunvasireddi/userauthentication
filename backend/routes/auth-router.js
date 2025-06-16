import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth-controller.js";
import { protectMiddleware } from "../middleware/authMiddleware.js";

const registerRouter = Router();
registerRouter.route("/register").post(registerController);

const loginRouter = Router();
loginRouter.route("/login").post(loginController);

const protectMiddlewareRouter = Router();
protectMiddlewareRouter.get("/me", protectMiddleware, (req, res) => {
  res.json({
    message: "you are authorized",
    userId: req.user.id,
  });
});
export { registerRouter, loginRouter, protectMiddlewareRouter };
