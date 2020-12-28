const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Product = require("../../models/Product");
const { Router } = require("express");

// @route POST api/product
// @desc Test
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Product name is required").not().isEmpty(),
      check("description", "Product description is required").not().isEmpty(),
      check("imageURL", "Product picture is required").not().isURL(),
      check("category", "Product should belongs to a category.")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, name, description, imageURL, category } = req.body;

      const productClientData = {};
      if (id) productClientData.id = id;
      if (name) productClientData.name = name;
      if (description) productClientData.description = description;
      if (imageURL) productClientData.imageUrl = imageURL;
      if (category) productClientData.category = category;
      productClientData.seller = req.user.id;

      //Check user in DB
      if (productClientData.id) {
        let product = await Product.findById(productClientData.id);
        if (product) {
          //Update product
          product = await Product.findOneAndUpdate(
            { _id: productClientData.id },
            {
              $set: productClientData,
            },
            {
              new: true,
            }
          );
          return res.json(product);
        }
      }

      const avatar = gravatar.url(name, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      productClientData.imageUrl = avatar;

      //Make new category
      product = new Product(productClientData);
      product.save();
      return res.send(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/product/id
// @desc get category by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).json({ msg: "There is no product for this id" });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no product for this id" });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/product/search
// @desc search category
// @access Private
router.get("/search/:search", auth, async (req, res) => {
  try {
    const product = await Product.find({
      $or: [
        { name: { $regex: ".*" + req.params.search + ".*" } },
        { description: { $regex: ".*" + req.params.search + ".*" } },
      ],
    });
    if (!product)
      return res.status(400).json({ msg: "There is no product for this id" });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no product for this id" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
