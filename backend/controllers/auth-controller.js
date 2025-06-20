import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const registerController = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const isUserExisted = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExisted) {
      return res.status(404).json({
        success: false,
        message: "entred email is existed ,try again with another email",
      });
    }
    // since user is not existed so we have to create new user
    // for that we have to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role,
    });
    if (!newUser)
      return res.status(400).json({
        success: false,
        message: "failed to register user ",
      });
    res.status(200).json({
      success: true,
      message: "user is registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "failed to register the user",
    });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExisted = await User.findOne({ username });
    if (!userExisted)
      return res.status(400).json({
        success: false,
        message: "user is not existed ,please register",
      });
    const isPasswordMatch = await bcrypt.compare(
      password,
      userExisted.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "password is incorrect please enter the correct pasword",
      });
    }
    // after the password is also maching we have to create a token which is hold the information of logined user
    const token = jwt.sign({  userExisted}, process.env.JWT_SECRET, {
      expiresIn: "8d",
    });
    console.log(token);
    res.status(200).json({
      success: true,
      message: " user logined successfully",
      user: userExisted,
      token,
    });
  } catch (error) {
    console.log("this is the error ", error);
    res.status(404).json({
      success: false,
      message: "failed to login please try again",
    });
  }
};

const adminController = async (req, res) => {
  res.json({
    success: true,
    message: "welcome to admin page ",
  });
};

export { registerController, loginController, adminController };
