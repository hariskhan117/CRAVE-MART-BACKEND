import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUserService = async ({
  fullName,
  email,
  password,
  profileImageLocalPath,
}) => {
  // Check required fields
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check existing user
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Profile image required
  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile image is required");
  }

  // Upload image to Cloudinary
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  console.log("IMAGE", profileImage);

  if (!profileImage?.url) {
    throw new ApiError(500, "Profile image upload failed");
  }

  // Create user
  const user = await User.create({
    fullName,
    profileImage: profileImage.url,
    email,
    password,
  });

  // Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return createdUser;
};
