const express = require("express");
const router = express.Router();
const passport = require("passport");

const { check } = require('express-validator');

const { getCart, updateCart } = require("../controllers/cart")

// @route   PUT /cart
// @desc    Add one product to cart
// @access  Private
router.get(
    "/",
    getCart);

// @route   PUT /cart
// @desc    Add one product to cart
// @access  Private
router.put(
    "/",
    check("id", "Id is required")
        .not()
        .isEmpty(),
    check("productId", "Product id is required")
        .not()
        .isEmpty(),
    check("quantity", "Quantity is required")
        .not()
        .isEmpty(),
    updateCart);

module.exports = router;