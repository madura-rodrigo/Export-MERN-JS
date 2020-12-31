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
    auth("Seller"),
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

      const avatar = gravatar.url(name, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      productClientData.imageUrl = avatar;

      //Make new category
      product = new Product(productClientData);
      await product.save();
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
router.get("/:id", auth(), async (req, res) => {
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
router.get("/search/:search", auth(), async (req, res) => {
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

// @route PUT api/products/{:productid}/likes
// @desc Add likes to the product. Only non sellers can use this API
// @access Private
router.put("/:productid/likes", auth(), async (req, res) => {
  try {
    if (req.user.role == "Seller")
      return res
        .status(400)
        .json({ msg: "Sellers cannot like or dislike for products." });

    let product = await Product.findById(req.params.productid);
    if (!product.likes.likedUsers.includes(req.user.id)) {
      product.likes.likedCount = product.likes.likedCount + 1;
      product.likes.likedUsers.push(req.user.id);
      await product.save();
      return res.send(product.likes);
    } else {
      return res.status(400).json({ msg: "User already liked." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELELTE api/products/{:productid}/likes
// @desc Delete likes to the product. Only non sellers can use this API
// @access Private
router.delete("/:productid/likes", auth(), async (req, res) => {
  try {
    if (req.user.role == "Seller")
      return res
        .status(400)
        .json({ msg: "Sellers cannot like or dislike for products." });

    let product = await Product.findById(req.params.productid);

    if (product.likes.likedUsers.includes(req.user.id)) {
      product.likes.likedCount = product.likes.likedCount - 1;
      product.likes.likedUsers = product.likes.likedUsers.filter(
        (item) => item != req.user.id
      );
    }
    await product.save();

    return res.send(product.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/products/{:productid}/reviews
// @desc Add review to the product. Only non sellers can use this API
// @access Private
router.put(
  "/:productid/reviews",
  [auth(), [check("rate", "Rating is required.").isInt({ min: 1, max: 5 })]],
  async (req, res) => {
    try {
      if (req.user.role == "Seller")
        return res.status(400).json({ msg: "Sellers cannot review products." });
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let product = await Product.findById(req.params.productid);
      const { rate, comment } = req.body;
      const reviewer = req.user.id;
      const newReview = { reviewer, rate, comment };
      product.review.unshift(newReview);
      await product.save();
      return res.send(product.review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELELTE api/products/{:productid}/likes
// @desc Delete likes to the product. Only non sellers can use this API
// @access Private
router.delete("/:productid/reviews/:id", auth(), async (req, res) => {
  try {
    if (req.user.role == "Seller")
      return res
        .status(400)
        .json({ msg: "Sellers cannot delete products reviews." });

    let product = await Product.findById(req.params.productid);

    product.review = product.review.filter(
      (item) => item.id != req.params.id || item.reviewer != req.user.id
    );

    await product.save();

    return res.send(product.review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
