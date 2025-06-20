import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const protectMiddleware = (req, res, next) => {
  console.log("hi hello this is proect middleware");
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "no token is provided",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.userExisted;
    console.log(req.user);
    next();
  } catch (error) {
    console.log("this is the middleware error ", error);
    res.status(401).json({
      message: "invalid token",
    });
  }
};

const adminProtectmiddleware = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const existedUser = await User.findById(req.user._id);
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "user is not existed",
      });
    }
    if (existedUser.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "you are not a admin",
      });
    }
    console.log("welcome to admin page");
    next();
  } catch (error) {
    console.log("error while login to admin page", error);
    res.status(400).json({
      success: false,
      message: "unable to login ",
    });
  }
};

export { protectMiddleware, adminProtectmiddleware };
