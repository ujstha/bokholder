require("dotenv").config();
const cloudinary = require("cloudinary");
const cloudinary_storage = require("multer-storage-cloudinary");

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//storing image to cloudinary using multer
cloudinary_storage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
  resource_type: ["image", "raw"]
});

const ImageUploader = async (req, res, file, next, type) => {
  if (type === "update") {
    if (file && file.originalname && file.buffer) {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "image" }, function(error, result) {
          if (error) console.log("Error : " + error);
          else {
            req.body.poster = result.secure_url; //assigning url as a value for poster
            next();
          }
        })
        .end(file.buffer);
    } else {
      req.body.poster = res.poster;
      next();
    }
  } else if (type === "post" && file && file.originalname && file.buffer) {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "image" }, function(error, result) {
        if (error) console.log("Error : " + error);
        else {
          req.body.poster = result.secure_url; //assigning url as a value for poster
          next();
        }
      })
      .end(file.buffer);
  } else {
    req.body.poster =
      "https://res.cloudinary.com/doo4zgtkg/image/upload/v1581612780/covernotavailable.jpg";
    next();
  }
};

module.exports = { ImageUploader }; //curly braces because of async function
