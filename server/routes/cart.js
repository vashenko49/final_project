const express = require("express");
const router = express.Router();
const passport = require("passport");

const { check } = require('express-validator');

const { getCart, addNewProduct, updateQuantity, deleteProductFromCart } = require("../controllers/cart")

// @route   GET /cart/:id
// @desc    Get customer cart
// @access  Private
router.get(
    "/:id",
    getCart);

// @route   POST /cart/:id
// @desc    Add one product to cart
// @access  Private
router.post(
    "/:id",
    check("productId", "Product id is required")
        .not()
        .isEmpty(),
    check("quantity", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
        addNewProduct);

// @route   PUT /cart/:id
// @desc    Change quantity of product
// @access  Private
router.put(
    "/:id",
    check("productId", "Product id is required")
        .not()
        .isEmpty(),
    check("quantity", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
    updateQuantity);

// @route   DELETE /cart/:id
// @desc    Delete one product from cart
// @access  Private
router.delete(
    "/:id",
    check("productId", "Quantity is required and must be greater then 0")
        .not()
        .isEmpty()
        .isInt({ gt: 0 }),
    deleteProductFromCart);

module.exports = router;
