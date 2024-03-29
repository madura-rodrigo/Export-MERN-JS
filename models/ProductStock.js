const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductStockSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  avilableUnits: {
    type: Number,
    required: true,
  },
  measuringUnit: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  retailUnitPrice: {
    type: Number,
    required: true,
  },
  retailMinAmount: {
    type: Number,
    required: true,
  },
});

module.exports = ProductStock = mongoose.model(
  "ProductStock",
  ProductStockSchema
);
