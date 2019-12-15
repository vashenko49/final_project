const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//Import controllers
const { updateCart, updateProductFromCart, cleanCart, getCart } = require("../controllers/cart");

// @route   PUT /cart
// @desc    Update cart when adding / deleting products in cart
// @access  Private
router.put(
  "/",
  [
    check("idCustomer", "idCustomer is require")
      .not()
      .isEmpty(),
    check("products.*.idProduct", "idProduct is require")
      .not()
      .isEmpty(),
    check("products.*.modelNo", "modelNo is require")
      .not()
      .isEmpty(),
    check("products.*.quantity", "cartQuantity is require")
      .isNumeric()
      .isInt({ min: 0 })
  ],
  updateCart
);

// @route   PUT /cart/product
// @desc    Edit one product to cart
// @access  Private
router.put(
  "/product",
  [
    check("idCustomer", "idCustomer is require")
      .not()
      .isEmpty(),
    check("idProduct", "idProduct is require")
      .not()
      .isEmpty(),
    check("modelNo", "modelNo is require")
      .not()
      .isEmpty(),
    check("quantity", "cartQuantity is require")
      .isNumeric()
      .isInt({ min: 0 })
  ],
  updateProductFromCart
);

// @route   DELETE /cart/:idCustomer
// @desc    clean cart
// @access  Private
router.delete("/:idCustomer", cleanCart);

// @route   GET /cart
// @desc    Get cart for customer
// @access  Private
router.get("/:idCustomer", getCart);

module.exports = router;
