import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config();

export const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};
