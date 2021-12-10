const fs = require("fs");
const path = require("path");
const buffer = async (pic) => {
  const promise = fs.promises.readFile(path.join(`${pic}`));
  const buffers = await Promise.resolve(promise);
  // console.log(buffers);
  return buffers;
};
module.exports = buffer;
