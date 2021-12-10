const fs = require("fs");
const multer = require("multer");
const path = require("path");

//const mul = (req) => {
const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "images");
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimType && extname) {
      return cb(null, true);
    }
    cb("You must provide proper file format");
  },
});
// return upload;
//};

module.exports = upload;
