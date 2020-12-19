const mongoose = require("mongoose");

let user = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
};

let seller = Object.create(user);
seller = {
  companyName: {
    type: String,
    required: true,
  },
  review: {
    type: Object,
  },
  categoryId: {
    type: String,
    required: true,
  },
};

let buyer = Object.create(user);
buyer = {
  session: {
    type: Object,
  },
};

const SellerSchema = new mongoose.Schema(seller);

const BuyerSchema = new mongoose.Schema(buyer);

module.exports = Seller = mongoose.model("seller", SellerSchema, "users");

module.exports = Buyer = mongoose.model("buyer", BuyerSchema, "users");
