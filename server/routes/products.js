const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require('express-validator');

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
  check('enabled', 'Enabled is required')
    .not()
    .isEmpty(),
  check('name', 'name is required')
    .not()
    .isEmpty(),
  check('currentPrice', 'Current Price is required')
    .not()
    .isEmpty(),
  check('categories', 'Categories is required')
    .not()
    .isEmpty(),
  check('imageUrls', 'Image Urls is required')
    .not()
    .isEmpty(),
  check('quantity', 'Quantity is required')
    .not()
    .isEmpty(),
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
  check('enabled', 'Enabled is required')
    .not()
    .isEmpty(),
  check('name', 'name is required')
    .not()
    .isEmpty(),
  check('currentPrice', 'Current Price is required')
    .not()
    .isEmpty(),
  check('categories', 'Categories is required')
    .not()
    .isEmpty(),
  check('imageUrls', 'Image Urls is required')
    .not()
    .isEmpty(),
  check('quantity', 'Quantity is required')
    .not()
    .isEmpty(),
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
