const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// middleware to handle json
app.use(express.json());

const whiteList = [
  "http://localhost:5173",
  "http://localhost:3002",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "https://homestay-app-client.vercel.app",
];

// CORS
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin !== -1)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    exposedHeaders: ["set-cookie"],
  })
);

// use express router
app.use("/", require("./routes"));

connectWithDB().then(() => {
  app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
      console.log("Error in connecting to server: ", err);
    }
    console.log(`Server is running on port no. ${process.env.PORT}`);
  });
});

module.exports = app;
