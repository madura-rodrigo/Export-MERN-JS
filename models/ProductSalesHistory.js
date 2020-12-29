const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSalesHistorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  selledUnits: {
    type: Number,
    required: true,
  },
  totalIncome: {
    type: Number,
    required: true,
  },
});

module.exports = ProductSalesHistory = mongoose.model(
  "ProductSalesHistory",
  ProductSalesHistorySchema
);
