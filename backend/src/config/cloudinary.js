const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY ? "EXISTS" : "MISSING",
  api_secret: process.env.CLOUD_API_SECRET ? "EXISTS" : "MISSING",
});

module.exports = cloudinary;
