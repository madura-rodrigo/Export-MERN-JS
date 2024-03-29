const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const { User } = require("../../models/User");

// @route GET api/auth
// @desc Test
// @access Public
router.get("/", auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Test
// @access Public
router.post(
  "/",
  [
    check("email", "Please enter valid email.").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      //Check user in DB

      let user = await User.findOne({ email });
      //Response error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials." }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials." }] });
      }
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

module.exports = router;
