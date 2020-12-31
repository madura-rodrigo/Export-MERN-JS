const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const ProductStock = require("../../models/ProductStock");
const Product = require("../../models/Product");

// @route POST api/product-stocks
// @desc Test
// @access Private
router.post(
  "/",
  [
    auth("Seller"),
    [
      check(
        "avilableUnits",
        "Avilable units either be zero or positive number"
      ).isInt({ min: 0 }),
      check("measuringUnit", "Unit measure is required").not().isEmpty(),
      check("unitPrice", "Unit price is required").isFloat({ min: 0 }),
      check("retailUnitPrice", "Retail unit price is required").isFloat({
        min: 0,
      }),
      check(
        "retailMinAmount",
        "Minimum amount for retail price is required."
      ).isFloat({ min: 0 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        id,
        product,
        avilableUnits,
        measuringUnit,
        unitPrice,
        retailUnitPrice,
        retailMinAmount,
      } = req.body;

      const productStockClientData = {};
      if (id) productStockClientData.id = id;
      if (product) productStockClientData.product = product;
      if (measuringUnit) productStockClientData.measuringUnit = measuringUnit;
      if (unitPrice) productStockClientData.unitPrice = unitPrice;
      if (retailUnitPrice)
        productStockClientData.retailUnitPrice = retailUnitPrice;
      if (retailMinAmount)
        productStockClientData.retailMinAmount = retailMinAmount;

      //Check user in DB
      if (productStockClientData.product) {
        let product = await Product.findById(productStockClientData.product);
        if (product) {
          let productStock = await ProductStock.findById(
            productStockClientData.id
          );
          if (productStock) {
            if (avilableUnits)
              productStockClientData.avilableUnits =
                productStock.avilableUnits + avilableUnits;
            //Update product
            productStock = await ProductStock.findOneAndUpdate(
              { _id: productStockClientData.id },
              {
                $set: productStockClientData,
              },
              {
                new: true,
              }
            );
            return res.json(productStock);
          } else {
            //Make new ProductStock
            if (avilableUnits)
              productStockClientData.avilableUnits = avilableUnits;
            productStock = new ProductStock(productStockClientData);
            await productStock.save();
            return res.send(productStock);
          }
        } else {
          return res
            .status(400)
            .json({ msg: "There is no product for this id." });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/product-stocks
// @desc get stock by product id
// @access Private
router.get("/:id", auth(), async (req, res) => {
  try {
    const stock = await ProductStock.findOne({
      product: req.params.id,
    }).populate("product");
    if (!stock)
      return res
        .status(400)
        .json({ msg: "There is no productStock for this product" });
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no product for this id" });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/product-stocks/category/id
// @desc get product stocks by category
// @access Private
router.get("/category/:id", auth(), async (req, res) => {
  try {
    const productList = await Product.find({ category: req.params.id });
    if (!productList || productList.isEmpty)
      return res
        .status(400)
        .json({ msg: "There are no products for this category." });
    const productIds = productList.map((product) => product._id);
    let productStocks = await ProductStock.find()
      .where("product")
      .in(productIds)
      .populate("product");
    res.json(productStocks);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no product for this id" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
