const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/file-upload");
const { check, validationResult, body } = require("express-validator");
const mongoose = require("mongoose");
const multer = require("multer");
const config = require("config");

const Category = require("../../models/Category");
const { Router } = require("express");

// @route POST api/category
// @desc Test
// @access Private
router.post(
  "/",
  [
    auth(),
    [
      body("name", "Category name is required").isEmpty(),
      body("description", "Category description is required").isEmpty(),
    ],
    upload("categories/").single("image"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { _id, name, description } = req.body;

      const categoryFields = {};
      if (_id) categoryFields.id = _id;
      if (name) categoryFields.name = name;
      if (description) categoryFields.description = description;
      if (req.file.path)
        categoryFields.iconUrl = "categories/" + req.file.filename;

      //Check user in DB
      if (categoryFields.id) {
        let category = await Category.findById(categoryFields.id);
        if (category) {
          //Update category
          category = await Category.findOneAndUpdate(
            { _id: categoryFields.id },
            {
              $set: categoryFields,
            },
            {
              new: true,
            }
          ).select("id name description iconUrl");
          return res.json(category);
        }
      }

      //Make new category
      category = new Category(categoryFields);
      await category.save();
      return res.send(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/category/id
// @desc get category by id
// @access Private
router.get("/:id", auth(), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).select(
      "id name description iconUrl"
    );
    if (!category)
      return res.status(400).json({ msg: "There is no category for this id" });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no category for this id" });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/category
// @desc get all categories
// @access Private
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}).select(
      "id name description iconUrl"
    );
    if (!categories)
      return res.status(400).json({ msg: "There is no categories." });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no categories." });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/category/search
// @desc search category
// @access Private
router.get("/search/:search", auth(), async (req, res) => {
  try {
    const category = await Category.find({
      $or: [
        { name: { $regex: ".*" + req.params.search + ".*" } },
        { description: { $regex: ".*" + req.params.search + ".*" } },
      ],
    }).select("id name description iconUrl");
    if (!category)
      return res.status(400).json({ msg: "There is no category for this id" });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no category for this id" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
