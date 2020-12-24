const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Category = require("../../models/Category");
const { Router } = require("express");

// @route POST api/category
// @desc Test
// @access Private
router.post(
  "/",
  auth,
  [
    check("name", "Category name is required").not().isEmpty(),
    check("description", "Category description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;

      //Check user in DB

      let category = await Category.findOne({ name });
      //Response error
      if (category) {
        return res.status(400).json({ errors: [{ msg: "Category exists" }] });
      }

      const avatar = gravatar.url(name, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //Make new user
      category = new Category({
        name,
        description,
        avatar,
      });

      category.save();
      return res.status(200).send(category.json);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route POST api/category/id
// @desc Test
// @access Private
router.post(
  "/id",
  auth,
  [
    check("name", "Category name is required").not().isEmpty(),
    check("description", "Category description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, name, description } = req.body;

      const avatar = gravatar.url(name, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //Update category
      await Category.findOneAndUpdate(
        { _id: id },
        {
          name,
          description,
          avatar,
        },
        {
          useFindAndModify: false,
          new: true,
          fields: { id, name, description, avatar },
        },
        (err, result) => {
          if (err) {
            console.error(err.message);
            res.status(500).send(err);
          } else {
            res.json(result.toObject);
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
