const express = require("express");

const { Buffer_Upload, sequelize } = require("./models");
const upload = require("./fileUpload");
const buffer = require("./imageToBuffer");
const fileDelete = require("./deleteFile");
const bufferToImage = require("./bufferToImage");

const app = express();

//buffer();
app.post(
  "/pic",
  upload.single("images"),
  async (req, res) => {
    const pic = req.file.path;

    const buff = await buffer(pic);

    const picUpload = await Buffer_Upload.create({ picName: buff });

    fileDelete(pic);
    res.status(200).json({
      status: "success",
      picUpload,
    });
  },
  (err, req, res, next) => {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
);

app.get(
  "/pic",
  async (req, res) => {
    const pic = await Buffer_Upload.findAll();
    //console.log(pic);
    res.status(201).json({
      status: "success",
      data: {
        pic,
      },
    });
  },
  (err, req, res, next) => {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
);

app.get(
  "/pic/:id",
  async (req, res) => {
    const id = req.params.id;
    const pic = await Buffer_Upload.findOne({ where: { id } });
    const html = bufferToImage(pic);
    res.send(html);
    //     res.status(201).json({
    //       status: "success",
    //       data: {
    //         pic,
    //       },
    //     });
  },
  (req, res, next) => {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
);

app.delete(
  "/pic/:id",
  async (req, res) => {
    const id = req.params.id;
    await Buffer_Upload.destroy({ where: { id } });
    res.status(204).json({
      status: "success",
      message: "data deleted successfully",
    });
  },
  (err, req, res, next) => {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`Listening to the port ${app.get("port")}`);
  sequelize.authenticate().then(() => {
    console.log("db connected successful");
  });
});
