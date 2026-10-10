import { asyncHandler } from "../utils/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerUserService } from "../services/user.service.js";

export const registerUser = asyncHandler(async (req, res) => {
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

const loginUser = asyncHandler(async (req, res) => {});
