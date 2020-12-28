const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSessionSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItems",
      required: true,
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
});

module.exports = Product = mongoose.model("OrderSession", OrderSessionSchema);
