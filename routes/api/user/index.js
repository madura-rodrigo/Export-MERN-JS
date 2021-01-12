const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const userProfile = require("./user");
const validator = require("./validator");

// @route POST api/profile
// @desc Register as a new user as default buyer
// @access Public
router.post("/", validator.validateRegisterUser, userProfile.registerUser);

// @route GET api/profile/me
// @desc get current user profile
// @access Public
router.get("/me", auth(), userProfile.getUserProfile);

// @route PUT api/profile/me
// @desc update current user profile
// @access Public
router.put(
  "/me",
  auth(),
  validator.validateUpdateUser,
  userProfile.updateUserProfile
);

module.exports = router;
