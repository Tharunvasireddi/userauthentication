import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    if (!file || !file.originalname) {
      return cb(new Error("File not found or invalid"), null);
    }
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const checkfilter = (req, file, cb) => {
  if (file.mime.startWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("not a image ,please upload an image "));
  }
};

export default multer({
  storage,
  checkfilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
