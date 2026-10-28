import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/index.js";
import { Product } from "../models/product.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;
  const categoryImageLocalPath = req.file?.path;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Category  name is  required");
  }

  const existedCategory = await Category.findOne({ name: name.trim() });
  if (existedCategory) {
    throw new ApiError(409, "Category already exist");
  }
  let image = "";
  if (categoryImageLocalPath) {
    const uploadImage = await uploadOnCloudinary(categoryImageLocalPath);
    if (!uploadImage) {
      throw new ApiError(500, "Category image upload failed");
    }
    image = uploadImage.secure_url;
  }

  const category = await Category.create({
    name: name.trim(),
    image,
    isActive:
      isActive === undefined ? true : isActive === "true" || isActive === true,
  });
  const createdCategory = await Category.findById(category._id);
  if (!createdCategory) {
    throw new ApiError(500, "Something went wrong while creating category");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { category: createdCategory },
        "Category created Successfully",
      ),
    );
});

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  console.log("Categories :", categories.length);

  const response = new ApiResponse(
    200,
    { categories },
    "Category fetch successfully",
  );

  console.log("Response data:", response);

  return res.status(200).json(response);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  await Product.deleteMany({ category: categoryId });
  await Category.findByIdAndDelete(categoryId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});
export { createCategory, getAllCategory, deleteCategory };
