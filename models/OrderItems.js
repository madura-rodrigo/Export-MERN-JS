const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({
  orderSession: {
    type: Schema.Types.ObjectId,
    ref: "OrderSession",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  isRetail: {
    type: Boolean,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = OrderItems = mongoose.model("OrderItems", OrderItemsSchema);
