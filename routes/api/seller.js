const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/sellers
// @desc Test
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
      const {
        firstName,
        lastName,
        email,
        country,
        area,
        address,
        phone,
        postalCode,
        password,
      } = req.body;

      //Check user in DB
      let user = await User.findOne({ email });
      //Response error
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //Make new user
      user = new User({
        firstName,
        lastName,
        email,
        country,
        area,
        address,
        phone,
        postalCode,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

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

module.exports = router;
