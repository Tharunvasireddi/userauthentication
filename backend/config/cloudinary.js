import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config("../.env");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
});

export default cloudinary;
