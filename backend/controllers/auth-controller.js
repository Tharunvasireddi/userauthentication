import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const registerController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
      return res.status(404).json({
        success: false,
        message: "entred email is existed ,try again with another email",
      });
    }
    // since user is not existed so we have to create new user
    // for that we have to hash the password
    console.log("hi hello");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hashedPassword });
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
  const { email, password } = req.body;
  try {
    const userExisted = await User.findOne({ email });
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
    const token = jwt.sign({ id: userExisted._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    res.status(200).json({
      success: true,
      message: " user logined successfully",
      user: {
        id: userExisted._id,
        email: userExisted.email,
      },
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

export { registerController, loginController };
