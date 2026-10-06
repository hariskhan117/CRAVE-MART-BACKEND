import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true },
);
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

export const WishList = mongoose.model("WishList", wishListSchema);
