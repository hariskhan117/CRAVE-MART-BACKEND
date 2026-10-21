import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/index.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, isAcitve } = req.body;
  const categoryImageLocalPath = req.file?.path;

  if ([name, isAcitve].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All Fields Are Required");
  }
  const image = await uploadOnCloudinary(categoryImageLocalPath);

  const category = await Category.create({
    name,
    image,
    isAcitve,
  });

  const existedCategory = await Category.findOne(category._id);

  if (!existedCategory) {
    throw new ApiError(500, "Something Went Wrong While Creating Category");
  }
});
