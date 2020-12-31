const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  likes: {
    likedCount: {
      type: Number,
      default: 0,
    },
    likedUsers: [String],
  },
  review: [
    {
      reviewer: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        default: 0,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = Product = mongoose.model("Product", ProductSchema);
