import { uploadToCloud, deleteFromCloud } from "../helpers/cloudinaryhelper.js";
import Image from "../models/Image.js";
const uploadImageController = async (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    return res.json({
      success: false,
      message: "file is not found",
    });
  }
  try {
    const { url, publicId } = await uploadToCloud(file.path);
    const newUploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.user._id,
    });
    res.status(200).json({
      success: true,
      message: "images is upoaded successfully",
      data: newUploadedImage,
    });
    console.log("images is uploaded successfully");
  } catch (error) {
    console.log("failed to upload a image ", error);
    res.status(400).json({
      success: false,
      message: "image is failed to upload",
    });
  }
};

const getAllImagesController = async (req, res) => {
  try {
    const images = await Image.find({});
    if (!images) {
      return res.status(400).json({
        success: false,
        message: "images are not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "images are fetched successfully",
      data: images,
    });
  } catch (error) {
    console.log("images are failed to fetched due to the error", error);
    res.status(400).json({
      success: false,
      message: "images failed to fetched ",
    });
  }
};

const getSingleImageController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "image id is not found",
    });
  }
  try {
    const getImage = await Image.findById(id);
    if (!getImage) {
      return res.status(404).json({
        success: false,
        message: "image is not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "successfully image is fetched",
      data: getImage,
    });
  } catch (error) {
    console.log("error at get image ", error);
    res.status(400).json({
      success: false,
      message: "failed to get images",
    });
  }
};

const deleteImageController = async (req, res) => {
  const { id } = req.params;
  console.log("this is that",id);
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "image id is not found",
    });
  }
  try {
    const deletedImage = await Image.findById(id);
    if (!deletedImage) {
      return res.status(400).json({
        success: false,
        message: "image is not found",
      });
    }
    console.log(req.user, "at delete", "uploaded by", deletedImage);
    const userid = req.user._id.toString();
    if (deletedImage.uploadedBy.toString() !== userid) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }
    await deleteFromCloud(deletedImage.publicId);
    await Image.findByIdAndDelete(id);
    res.status(200).json({
      success: false,
      message: "image is deleted successfully",
    });
  } catch (error) {
    console.log("unable to delete image", error);
    res.status(400).json({
      success: false,
      messsage: "failed to delete image",
    });
  }
};

export {
  uploadImageController,
  getAllImagesController,
  getSingleImageController,
  deleteImageController,
};
