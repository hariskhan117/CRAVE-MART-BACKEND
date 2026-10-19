import { asyncHandler } from "../utils/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerUserService } from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const profileImageLocalPath = req.file?.path;

  const createdUser = await registerUserService({
    fullName,
    email,
    password,
    profileImageLocalPath,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email are required");
  }
  const user = await User.findOne(email);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }
});

export { registerUser, loginUser };
