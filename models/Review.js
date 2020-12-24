const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  reviewer: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
