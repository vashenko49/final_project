const express = require("express");
const router = express.Router();
const {check} = require('express-validator');


//Import controllers
const {
  placeOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrders,
  getOrder
} = require("../controllers/orders");

// @route   POST /orders
// @desc    Place Order
// @access  Private
router.post("/",
  [
    check('delivery', 'delivery is require')
      .notEmpty(),
    check('email', 'email is require')
      .isEmail(),
    check('mobile', 'mobile is require')
      .not()
      .isEmpty()
  ],
  placeOrder);

// @route   PUT /orders/:id
// @desc    Update order
// @access  Private
router.put(
  "/",
  [
    check('idOrder', 'idOrder is require')
      .not()
      .isEmpty()
  ],
  updateOrder
);

// @route   PUT /orders/cancel/:id
// @desc    Cancel order
// @access  Private
router.put(
  "/cancel/:id",
  cancelOrder
);

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete(
  "/:id",
  deleteOrder
);

// @route   GET /orders
// @desc    Get all orders
// @access  Private
router.get("/", getOrders);

// @route   GET /orders/:orderNo
// @desc    Get one order by orderNo
// @access  Private
router.get(
  "/:orderNo",
  getOrder
);

module.exports = router;