const bufferToImage = (pic) => {
  const buf = Buffer.from(pic.picName);
  const base64 = buf.toString("base64");
  const html = `<html><body><img src='data:image/jpeg;base64,${base64}'/></body></body></html>`;
  return html;
};
module.exports = bufferToImage;
