import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js";
import fs from "fs";

console.log("CLOUD NAME :", Boolean(process.env.CLOUDINARY_CLOUD_NAME));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};
