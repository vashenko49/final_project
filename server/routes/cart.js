const express = require("express");
const router = express.Router();
const passport = require("passport");

const { check } = require('express-validator');

const { getCart, updateCart, updateQuantity, deleteProductFromCart } = require("../controllers/cart")

// @route   GET /cart
// @desc    Get customer cart
// @access  Private
router.get(
    "/",
    getCart);

// @route   POST /cart
// @desc    Add one product to cart
// @access  Private
router.post(
    "/",
    check("customerId", "Customer id is required")
        .not()
        .isEmpty(),
    check("productId", "Product id is required")
        .not()
        .isEmpty(),
    check("quantity", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
    updateCart);

// @route   PUT /cart
// @desc    Change quantity of product
// @access  Private
router.put(
    "/",
    check("id", "Id is required")
        .not()
        .isEmpty(),
    check("productId", "Product id is required")
        .not()
        .isEmpty(),
    check("quantity", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
    updateQuantity);

// @route   DELETE /cart
// @desc    Delete one product from cart
// @access  Private
router.delete(
    "/",
    check("id", "Id is required")
        .not()
        .isEmpty(),
    check("productId", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
    deleteProductFromCart);

module.exports = router;
