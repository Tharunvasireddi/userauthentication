import cloudinary from "../config/cloudinary.js";

const uploadToCloud = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log("error at cloudinary config", error);
    throw new Error("failed to upload image to cloud");
  }
};

const deleteFromCloud = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result === "ok") {
      console.log(" deleted the image from the cloudinary");
    } else {
      console.log("unable to delete the image from  the cloudinary");
    }
  } catch (error) {
    console.log("error is delete image from cloudinary", error);
  }
};

export { uploadToCloud, deleteFromCloud };
