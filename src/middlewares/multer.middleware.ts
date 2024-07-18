import { Request } from "express";
import multer from "multer";
// const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, "public/");
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Initialize upload
export const upload = multer({
  storage: storage,

  fileFilter: function (req: Request, file: any, cb: any) {
    checkFileType(file, cb);
  },
}); // 'image' is the field name in the form
