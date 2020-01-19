const express = require("express");
const router = express.Router();
const passport = require("passport");
const {check} = require("express-validator");

//Import controllers
const {updateCart, updateProductFromCart, cleanCart, getCart} = require("../controllers/cart");

// @route   PUT /cart
// @desc    Update cart when adding / deleting products in cart
// @access  Private
router.put(
  "/",
  [
    passport.authenticate("jwt", {session: false}),
    check("products.*.idProduct", "idProduct is require")
      .not()
      .isEmpty(),
    check("products.*.modelNo", "modelNo is require")
      .not()
      .isEmpty(),
    check("products.*.quantity", "cartQuantity is require")
      .isNumeric()
      .isInt({min: 0})
  ],
  updateCart
);

// @route   PUT /cart/product
// @desc    Edit one product to cart
// @access  Private
router.put(
  "/product",
  [
    passport.authenticate("jwt", {session: false}),
    check("idProduct", "idProduct is require")
      .not()
      .isEmpty(),
    check("modelNo", "modelNo is require")
      .not()
      .isEmpty(),
    check("quantity", "cartQuantity is require")
      .isNumeric()
      .isInt({min: 0})
  ],
  updateProductFromCart
);

// @route   DELETE /cart/:idCustomer
// @desc    clean cart
// @access  Private
router.delete("/", passport.authenticate("jwt", {session: false}), cleanCart);

// @route   GET /cart
// @desc    Get cart for customer
// @access  Private
router.get("/", passport.authenticate('jwt', {session: false}), getCart);

module.exports = router;
