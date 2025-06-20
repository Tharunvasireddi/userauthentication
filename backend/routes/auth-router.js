import { Router } from "express";
import {
  adminController,
  loginController,
  registerController,
} from "../controllers/auth-controller.js";
import {
  adminProtectmiddleware,
  protectMiddleware,
} from "../middleware/authMiddleware.js";
import {
  deleteImageController,
  getAllImagesController,
  getSingleImageController,
  uploadImageController,
} from "../controllers/image-controllers.js";
import imageMiddleware from "../middleware/image-middleware.js";
const registerRouter = Router();
registerRouter.route("/register").post(registerController);

const loginRouter = Router();
loginRouter.route("/login").post(loginController);

const protectMiddlewareRouter = Router();
protectMiddlewareRouter.get("/user", protectMiddleware, (req, res) => {
  res.json({
    message: "you are authorized",
    userId: req.user,
  });
});

const adminRouter = Router();
adminRouter
  .route("/admin")
  .get(protectMiddleware, adminProtectmiddleware, adminController);

const uploadImageRouter = Router();
uploadImageRouter
  .route("/upload")
  .post(
    protectMiddleware,
    adminProtectmiddleware,
    imageMiddleware.single("file"),
    uploadImageController
  );
const getAllImagesRouter = Router();
getAllImagesRouter
  .route("/getAll")
  .get(protectMiddleware, getAllImagesController);

const getSingleImageRouter = Router();
getSingleImageRouter
  .route("/getImage/:id")
  .get(protectMiddleware, getSingleImageController);

const deleteImageRouter = Router();
deleteImageRouter
  .route("/deleteImage/:id")
  .delete(protectMiddleware, adminProtectmiddleware, deleteImageController);
export {
  registerRouter,
  loginRouter,
  protectMiddlewareRouter,
  adminRouter,
  uploadImageRouter,
  getAllImagesRouter,
  getSingleImageRouter,
  deleteImageRouter,
};
