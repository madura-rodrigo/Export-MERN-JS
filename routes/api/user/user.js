const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../../middleware/auth");
const { validationResult } = require("express-validator");

const { User, Seller } = require("../../../models/User");

exports.registerUser = async (req, res) => {
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
      d: "retro",
    });
    userData.avatar = avatar;

    //Make new user
    user = new User(userData);

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
};

exports.getUserProfile = async (req, res) => {
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
};

exports.updateUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user)
      return res.status(400).json({ msg: "There is no profile for this id" });

    const userData = {};
    userData.firstName = req.body.firstName;
    userData.lastName = req.body.lastName;
    userData.email = user.email;
    userData.country = req.body.country;
    userData.area = req.body.area;
    userData.address = req.body.address;
    userData.phone = req.body.phone;
    userData.postalCode = req.body.postalCode;
    userData.isSeller = Boolean(req.body.isSeller);
    userData.category = req.body.category;
    userData.companyName = req.body.company;
    userData.password = user.password;

    if (userData.isSeller != true) {
      //Update category
      user = await User.findOneAndUpdate(
        { _id: user.id },
        {
          $set: userData,
        },
        {
          new: true,
        }
      ).select("-password");
    } else {
      //Convert to Seller
      if (user.users !== "Seller") {
        userData.users = "Seller";
        user = User.findOneAndUpdate(
          { _id: user.id },
          { users: user.users },
          { new: true }
        );
      }
      user = await Seller.findOneAndUpdate(
        { _id: user.id },
        {
          $set: userData,
        },
        {
          new: true,
        }
      ).select("-password");
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
