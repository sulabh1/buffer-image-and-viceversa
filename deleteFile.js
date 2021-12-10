const fs = require("fs");

const fileDelete = (pic) => {
  fs.unlink(pic, (err) => {
    if (err) {
      throw new Error("file deleted unseccessful");
    }
    console.log("file deleted");
  });
};
module.exports = fileDelete;
