const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
  },
  { discriminatorKey: "users" }
);

const User = mongoose.model("User", UserSchema);

const SellerSchema = new Schema({
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
});
const Seller = User.discriminator("Seller", SellerSchema);

const BuyerSchema = new Schema({
  session: {
    type: Object,
  },
});
const Buyer = User.discriminator("Buyer", BuyerSchema);

module.exports = { Seller, Buyer };
