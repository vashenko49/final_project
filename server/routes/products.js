const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require('express-validator');

//Import controllers
const {
  addProduct,
  addModelForProduct,
  updateProduct,
  updateModelForProduct,
  getProducts,
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
      .isEmpty(),
    check('page', "page is requrie")
      .isNumeric(),
    check('limit', "limit is requrie")
      .isNumeric(),
    check('sort', 'sort is require')
      .isNumeric()
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
// @access  Public
router.get("/", getProducts);

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private
router.delete("/:id", deleteProduct);

// @route   DELETE /products/model/:id/:modelno
// @desc    Delete product
// @access  Private
router.delete("/model/:id/:modelno", deleteModelProduct);


module.exports = router;
