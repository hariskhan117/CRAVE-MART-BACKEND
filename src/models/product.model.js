import mongoose from "mongoose";

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    variants: [
      {
        size: {
          type: String,
          required: true,
        },

        color: {
          type: String,
          required: true,
        },

        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", productModel);
