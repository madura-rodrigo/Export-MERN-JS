const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const { User } = require("../../models/User");

// @route POST api/profile
// @desc Register as a new user as default buyer
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
      const userData = {};
      userData.firstName = req.body.firstName;
      userData.lastName = req.body.lastName;
      userData.email = req.body.email;
      userData.country = req.body.country;
      userData.area = req.body.area;
      userData.address = req.body.address;
      userData.phone = req.body.phone;
      userData.postalCode = req.body.postalCode;
      userData.password = req.body.password;

      //Check user in DB

      let user = await User.findOne({ email: userData.email });
      //Response error
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists" }] });
      }

      const avatar = gravatar.url(userData.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      userData.avatar = avatar;

      //Make new user
      user = new User(userData);

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      user.save();

      //Reurn jsonwebtoken
      const payload = {
        user: {
          id: user.id,
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

// @route GET api/profile/me
// @desc get current user profile
// @access Public
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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

// @route PUT api/profile/me
// @desc update current user profile
// @access Public
router.put(
  "/me",
  auth,
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
    check("area", "Area is required").not().isEmpty(),
    check("address", "Adress is required.").not().isEmpty(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("postalCode", "Postal code is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let user = await User.findById(req.user.id);
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

      //Update category
      user = await User.findOneAndUpdate(
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
