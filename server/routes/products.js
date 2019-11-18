const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProductById
} = require("../controllers/products");

// @route   POST /products
// @desc    Create new product
// @access  Private
router.post(
  "/",
  addProduct
);

// @route   GET /products/:id
// @desc    Get product by id
// @access  Public
router.get(
  "/:id",
  getProductById
);

// @route   PUT /products/:id
// @desc    Update existing product
// @access  Private
router.put(
  "/:id",
  updateProduct
);

// @route   GET /products
// @desc    GET existing products
// @access  Public
router.get("/", getProducts);

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete("/:id", deleteProduct);

module.exports = router;
