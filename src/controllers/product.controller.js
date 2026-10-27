import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { asyncHandler } from "../utils";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    discountPrice,
    category,
    variants,
    isActive,
  } = req.body;
  const productImageLocalPath = req.file?.path;

  if (
    !name?.trim() ||
    price === undefined ||
    !description?.trim() ||
    discountPrice === undefined ||
    !category
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedCategory = await Category.findById(category);
  if (!existedCategory) {
    throw new ApiError(404, "Category not found");
  }
  let image = "";
  if (productImageLocalPath) {
    const uploadImage = await uploadOnCloudinary(productImageLocalPath);
    if (!uploadImage) {
      throw new ApiError(500, "Product image upload failed");
    }
    image = uploadImage.url;
  }
  let parsedVariants = variants;
  if (typeof variants === "string") {
    try {
      parsedVariants = JSON.parse(variants);
    } catch (error) {
      throw new ApiError(400, "Invalid variants format");
    }
  }
  const product = await Product.create({
    name: name.trim(),
    price: Number(price),
    description: description.trim(),
    discountPrice: Number(discountPrice),
    category: existedCategory._id,
    variants: parsedVariants,
    image,
    isActive: isActive === undefined ? true : isActive,
  });
  return res
    .status(200)
    .json(new ApiResponse(201, { product }, "Product created successfully"));
});

const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product fetch successfully"));
});

export { createProduct, getAllProduct };
