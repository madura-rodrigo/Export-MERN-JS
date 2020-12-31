const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const { User, Seller } = require("../../models/User");

// @route POST api/profile/seller
// @desc Register as a new seller user
// @access Public
router.post(
  "/",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please enter valid email.").isEmail(),
    check("country", "Country is required").not().isEmpty(),
    check("area", "Area is required").not().isEmpty(),
    check("address", "Adress is required.").not().isEmpty(),
    check("categoryId", "Category is required.").not().isEmpty(),
    check("companyName", "Company is required.").not().isEmpty(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("postalCode", "Postal code is required").not().isEmpty(),
    check("password", "Need password with 6 or more characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const sellerData = {};
      sellerData.firstName = req.body.firstName;
      sellerData.lastName = req.body.lastName;
      sellerData.email = req.body.email;
      sellerData.country = req.body.country;
      sellerData.area = req.body.area;
      sellerData.address = req.body.address;
      sellerData.phone = req.body.phone;
      sellerData.postalCode = req.body.postalCode;
      sellerData.password = req.body.password;
      sellerData.companyName = req.body.companyName;
      sellerData.category = req.body.categoryId;

      //Check user in DB

      let user = await User.findOne({ email: sellerData.email });
      //Response error
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists" }] });
      }

      const avatar = gravatar.url(sellerData.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      sellerData.avatar = avatar;

      //Make new user
      user = new Seller(sellerData);

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

      //Reurn jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          role: user.users,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecretKey"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile/seller/me
// @desc get current user profile
// @access Public
router.get("/me", auth("Seller"), async (req, res) => {
  try {
    const user = await Seller.findById(req.user.id);
    if (!user)
      return res.status(400).json({ msg: "There is no profile for this id" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for this id" });
    }
    res.status(500).send("Server error");
  }
});

// @route PUT api/profile/seller/me
// @desc update current user profile
// @access Public
router.put(
  "/me",
  auth("Seller"),
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
    check("area", "Area is required").not().isEmpty(),
    check("address", "Adress is required.").not().isEmpty(),
    check("companyName", "Company is required.").not().isEmpty(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("postalCode", "Postal code is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await Seller.findById(req.user.id);
      if (!user)
        return res.status(400).json({ msg: "There is no profile for this id" });

      const sellerData = {};
      sellerData.firstName = req.body.firstName;
      sellerData.lastName = req.body.lastName;
      sellerData.email = user.email;
      sellerData.country = req.body.country;
      sellerData.area = req.body.area;
      sellerData.address = req.body.address;
      sellerData.phone = req.body.phone;
      sellerData.postalCode = req.body.postalCode;
      sellerData.password = user.password;
      sellerData.companyName = req.body.companyName;
      sellerData.category = user.category;

      //Update category
      user = await Seller.findOneAndUpdate(
        { _id: user.id },
        {
          $set: sellerData,
        },
        {
          new: true,
        }
      ).select("-password");
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
