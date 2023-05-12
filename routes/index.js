const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
// const fileUpload = require('express-fileupload');
const multer = require("multer");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// const { S3Client } = require("@aws-sdk/client-s3");

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: "YOUR_ACCESS_KEY_ID_HERE", // store it in .env file to keep it safe
//     secretAccessKey: "YOUR_SECRET_KEY_HERE",
//   },
//   region: "ap-south-1", // this is the region that you select in AWS account
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "some-bucket",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

const upload = multer({
  dest: process.env.TEMPORARY_FILE_UPLOAD_PATH,
});

router.get("/", (req, res) => {
  res.status(200).json({
    greeting: "Hello from the server side!",
  });
});

// upload photo using image url
router.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    let result = await cloudinary.uploader.upload(link, {
      folder: "Airbnb/Places",
    });
    res.json(result.secure_url);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// upload images from local device
// upload.array("photos", 100) middleware will add req.files property to the request object
router.post("/upload", upload.array("photos", 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      let { path } = req.files[index];
      // why req.files is undefined
      //
      console.log(path);
      let result = await cloudinary.uploader.upload(path, {
        folder: "Airbnb/Places",
      });
      console.log(result);
      imageArray.push(result.secure_url);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
});

router.use("/user", require("./user"));
router.use("/places", require("./place"));
router.use("/bookings", require("./booking"));

module.exports = router;
