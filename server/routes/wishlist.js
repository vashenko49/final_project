const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

//$TODO$ ADD middleware

const {
  getWishlist, 
  updateWishlist, 
  deleteProduct} = require("../controllers/wishlist")

// @route GET /wishlist/:id
// @desc Get wishlist
// @access Private 
router.get(
  '/:id', getWishlist
)

// @route PUT /wishlist/:id
// @desc Create or update wishlist
// @access Private
router.put(
  '/:id', 
  check('product', 'Product is required')
    .not()
    .isEmpty(),
    updateWishlist)

// @route PUT /filters/:id
// @desc Delete one product
// @access Private
router.delete(
  '/:product', deleteProduct
)

module.exports = router;