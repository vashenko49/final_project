const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');
const Orders = require("../models/Order");

//Import controllers
const {
  addProduct,
  addModelForProduct,
  updateProduct,
  updateModelForProduct,
  getProducts,
  getProductsActive,
  deleteProduct,
  deleteModelProduct,
  getProductById,
  getProductsFilterParams,
  searchProductsHeader,
  searchProducts,
  activateOrDeactivateProduct,
  activateOrDeactivateProductModel
} = require("../controllers/products");

// @route   POST /products
// @desc    Create new product
// @access  Private
router.post(
  "/", [
    passport.authenticate("jwt-admin", {session: false}),
    check('nameProduct', 'nameProduct is required')
      .not()
      .isEmpty(),
    check('_idChildCategory', '_idChildCategory is required')
      .not()
      .isEmpty(),
  ],
  addProduct
);

// @route   POST /products/model
// @desc    Add model to product
// @access  Private
router.post(
  "/model",
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idProduct', 'Id product is require')
      .not()
      .isEmpty(),
    check('filters', 'Filter is require')
      .isArray(),
    check('quantity', 'Subfilter is require')
      .not()
      .isEmpty(),
    check('currentPrice', 'isCommon is require')
      .not()
      .isEmpty()
  ],
  addModelForProduct
);

// @route   PUT /products/
// @desc    Update existing product
// @access  Private
router.put(
  "/",
  passport.authenticate("jwt-admin", {session: false}),
  check('_idProduct', '_idProduct is required')
    .not()
    .isEmpty(),
  updateProduct
);

// @route   PUT /products/activateordeactivate
// @desc    activate or deactivate existing product
// @access  Private
router.put(
  '/activateordeactivate',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idProduct', '_idProduct is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateProduct
);


// @route   PUT /products/model
// @desc    Update existing product
// @access  Private
router.put(
  "/model", [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idProduct', '_idProduct is required')
      .not()
      .isEmpty(),
    check('modelNo', 'modelNo is require')
      .not()
      .isEmpty()
  ],
  updateModelForProduct
);


// @route   PUT /products/model/activateordeactivate
// @desc    activate or deactivate existing product
// @access  Private
router.put(
  '/model/activateordeactivate',
  [
    passport.authenticate("jwt-admin", {session: false}),
    check('_idProduct', '_idProduct is require')
      .not()
      .isEmpty(),
    check('modelNo', 'modelNo is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .isBoolean()
  ],
  activateOrDeactivateProductModel
);

// @route   GET /products/searchheader/:searchheader
// @desc    search for header. give 5 products
// @access  Public
router.get('/searchheader/:searchheader',
  searchProductsHeader
);

// @route   GET /products/filter
// @desc    Search products
// @access  Public
router.post('/filter',
  [
    check('idCatalog', 'idCatalog is require')
      .not()
      .isEmpty()
  ],
  getProductsFilterParams
);

// @route   GET /products/search/:search
// @desc    Search products
// @access  Public
router.get('/search/:search',
  searchProducts
);

// @route   GET /products/:id
// @desc    Get product by id
// @access  Public
router.get(
  "/:id",
  getProductById
);

// @route   GET /products
// @desc    GET existing products
// @access  Private
router.get("/", getProducts);


// @route   GET /products
// @desc    GET existing products
// @access  Public
router.get("/", getProductsActive);


// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete("/:id",    passport.authenticate("jwt-admin", {session: false}), deleteProduct);

// @route   DELETE /products/model/:id/:modelno
// @desc    Delete product
// @access  Private
router.delete("/model/:id/:modelno",    passport.authenticate("jwt-admin", {session: false}), deleteModelProduct);


module.exports = router;
